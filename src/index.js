import axios from "axios";
import Notiflix from 'notiflix';
// import { getImage } from "../src/js/requestAPI";

const searchBtn = document.querySelector('#search-form');


searchBtn.addEventListener('submit', event => {
    event.preventDefault();

    const searchValue = document.querySelector('input').value.trim();

getImage(searchValue)
.then((responce) => {console.log(response.data.hits)})
.catch((error) => console.error(error)); 
})


function getImage(search) {
    const searchParams = new URLSearchParams({
        key: '34747655-3d476a5c24b1ab5d2173a79ca',
        q: search,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true"
    })

    axios
    .get(`https://pixabay.com/api/?${searchParams.toString()}`)
    .then((response) => {
        if(response.data.hits == 0){
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        };
        console.log(response.data.hits);
        return response.data.hits;
    })
    .catch((error) => console.error(error))
    console.log();
};



function renderCollection(collection) {
    const galleryBox = document.querySelector('.gallery');
    galleryBox.innerHTML = '';
    const images = collection.map(item => {
        return `<div class="photo-card">
        <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes</b> ${item.likes}
          </p>
          <p class="info-item">
            <b>Views</b>  ${item.views}
          </p>
          <p class="info-item">
            <b>Comments</b>  ${item.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${item.downloads}
          </p>
        </div>
      </div>`
    }).join("");
    galleryBox.insertAdjacentHTML('beforeend', images);
}



