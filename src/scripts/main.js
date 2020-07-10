/**
 * @type {HTMLInputElement}
 */
const searchInput = document.getElementById('fetch-images');

searchInput.addEventListener('keydown', ({ keyCode }) => {
  if (keyCode === 13) getImages();
});

async function getImages() {
  const response = await fetch(`https://images-api.nasa.gov/search?q=${searchInput.value}`);
  showImages(await response.json());
}

function showImages(data) {
  const content = document.getElementById('content');
  content.innerHTML = '';

  const { items } = data.collection;
  const images = items.filter(el => el.data[0].media_type === 'image').map(el => el.links[0].href);

  images.forEach(el => {
    content.innerHTML += `<img src="${el}">`;
  });
}
