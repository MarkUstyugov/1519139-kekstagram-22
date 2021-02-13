import { createPhotoDescription } from './data.js';

const photosDescreption = createPhotoDescription();

const pictureList = document.querySelector('.pictures')
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPictureList = () => {
  const pictureListFragment = document.createDocumentFragment();

  photosDescreption.forEach((description) => {
    const pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = description.url;
    pictureItem.querySelector('.picture__likes').textContent = description.likes;
    pictureItem.querySelector('.picture__comments').textContent = description.comments.length;
    pictureListFragment.appendChild(pictureItem);
  });

  pictureList.appendChild(pictureListFragment);
};

export { renderPictureList };

