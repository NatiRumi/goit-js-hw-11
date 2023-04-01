import axios from "axios";
import Notiflix from 'notiflix';
import NewsApiService from "./js/requestAPI";
import renderCollection from "./js/markupImg";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const body = document.querySelector('body');
const searchBtn = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galleryBox = document.querySelector('.gallery');
const newsApiService = new NewsApiService();
const counter = document.querySelector('.img-counter');
let lightbox = new SimpleLightbox('.gallery a');

searchBtn.addEventListener('submit', onSearch); 
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  if(event.currentTarget.elements.searchQuery.value.trim() === "") {
    Notiflix.Notify.warning("Введіть значення для пошуку");
    return;
  }

  if(newsApiService.value == event.currentTarget.elements.searchQuery.value.trim()) {
    return;
  }

  newsApiService.value = event.currentTarget.elements.searchQuery.value.trim();

  newsApiService.resetPage();
  counterClear();

  const collection = await newsApiService.fetchArticles();

  if(collection.hits == 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  };

  LoadMoreBtnHide();
  clearCollection();
  renderCollection(collection.hits);
  lightbox.refresh();
  console.log(collection);
  console.log(collection.totalHits);

  if(collection.totalHits > newsApiService.per_page) {
    LoadMoreBtnActiv();
    counterActive();
    counter.innerHTML = `Ми знайшли для вас ще ${collection.totalHits - newsApiService.per_page * (newsApiService.page - 1)}  зображень`;
  } 

  if(collection.totalHits < newsApiService.per_page) {
    Notiflix.Notify.warning("На жаль, по Вашому запиту ми змогли знайти лише ці кілька зображень");
  }
}

async function onLoadMore() {
  counterClear();
  const collection = await newsApiService.fetchArticles();

  renderCollection(collection.hits);
  lightbox.refresh();
  console.log(collection);
  console.log(collection.totalHits);

  if(newsApiService.page > Math.ceil(Number(collection.totalHits / newsApiService.per_page)) ) {
    Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    LoadMoreBtnHide();
    counteraHide();
    return;
  };
     
  if((collection.totalHits - newsApiService.per_page * (newsApiService.page - 1)) > 0) {
    counterActive();
    counter.innerHTML = `Ми знайшли для вас ще ${collection.totalHits - newsApiService.per_page * (newsApiService.page - 1)}  зображень`;
  }
}

function clearCollection() {
  galleryBox.innerHTML = '';
}

function LoadMoreBtnActiv() {
  loadMoreBtn.style.display = "block";
}

function LoadMoreBtnHide() {
  loadMoreBtn.style.display = "none";
}

function counterActive() {
  counter.style.display = "block";
}

function counteraHide() {
  counter.style.display = "none";
}

function counterClear() {
  counter.innerHTML = "";
}