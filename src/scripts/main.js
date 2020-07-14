import Macy from 'macy';

/**
 * @type {HTMLInputElement}
 */
const searchInput = document.getElementById('fetch-images');
const macy = Macy({
  container: '#content-images',
  margin: 24,
});

searchInput.addEventListener('keydown', ({ keyCode }) => {
  if (keyCode === 13) getImages();
});

async function getImages() {
  const response = await fetch(
    `https://images-api.nasa.gov/search?q=${searchInput.value}&page=${page}`
  );
  showImages(await response.json());
}

function showImages(data) {
  const content = document.getElementById('content-images');
  content.innerHTML = '';
  console.log(data);

  const { items } = data.collection;
  const images = items.filter(el => el.data[0].media_type === 'image').map(el => el.links[0].href);

  images.forEach(el => {
    content.innerHTML += `<img src="${el}">`;
    pageNumber.innerHTML = page;
    console.log('images loaded');
  });

  macy.recalculate(true);
}
const nextPage = document.getElementById('next-page');
const lastPage = document.getElementById('last-page');
const pageNumber = document.getElementById('pageNumber');

let page = 1;

nextPage.addEventListener('click', () => {
  page++;
  getImages();
});

lastPage.addEventListener('click', () => {
  page--;
  getImages();
});
