import { renderBigPicture } from './picture-popup.js';
import { shuffle } from './util.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const RANDOM_PICTURES_AMOUNT = 10;

// Получения количиства коментарием у фото
const getCommentsAmount = (photo) => {
  return photo.comments.length;
};

// Сортировка по кол-во комментариев - убывание
const sortCommentDescend = (pictureA, pictureB) => {
  return getCommentsAmount(pictureB) - getCommentsAmount(pictureA);
};

// Очистка списка фотографий
const clearPictureList = (pictures) => {
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].outerHTML = '';
  }
};

const renderPictureList = (photosDescription) => {
  const pictureListFragment = document.createDocumentFragment();
  const pictures = pictureList.querySelectorAll('.picture');
  clearPictureList(pictures);

  photosDescription.forEach((description) => {
    const pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = description.url;
    pictureItem.querySelector('.picture__likes').textContent = description.likes;
    pictureItem.querySelector('.picture__comments').textContent = description.comments.length;
    pictureListFragment.appendChild(pictureItem);
  });
  pictureList.appendChild(pictureListFragment);
  renderBigPicture(photosDescription);
};

const renderPictureListDiscussed = (photosDescription) => {
  renderPictureList(photosDescription.slice().sort(sortCommentDescend));
};

const renderPictureListRandom = (photosDescription) => {
  renderPictureList(shuffle(photosDescription.slice()).slice(0, RANDOM_PICTURES_AMOUNT));
};

export { renderPictureList, renderPictureListDiscussed, renderPictureListRandom };
