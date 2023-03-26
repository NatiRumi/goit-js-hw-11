
import axios from "axios";



const searchBtn = document.querySelector('#search-form');
const searchValue = document.querySelector('input').value.trim();

searchBtn.addEventListener('submit', event => {
    event.preventDefault();

    getImage(searchValue);
    
})


const getImage  = (search) => {
    // const searchParams = new URLSearchParams({
    //     key: '34747655-3d476a5c24b1ab5d2173a79ca',
    //     q: document.querySelector('input').value.trim(),
    //     image_type: "photo",
    //     orientation: "horizontal",
    //     safesearch: "true"
    // })

    // return fetch('https://pixabay.com/api/?key=34747655-3d476a5c24b1ab5d2173a79ca&q=searchValue&image_type=photo').then(responce => {
    // console.log(responce);    
    // return responce.json();
    // }).catch()
    
    axios
    .get('https://pixabay.com/api/?key=34747655-3d476a5c24b1ab5d2173a79ca&q=searchValue&image_type=photo')
    .then((response) => {console.log(response)})
    .catch((error) => console.error(error))
}

