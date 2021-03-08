import { renderBigPicture } from './picture-popup.js';
import { shuffle } from './util.js';

const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const commentList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const RANDOM_PICTURES_AMOUNT = 10;

// Получения количиства коментарием у фото
const getCommentsAmount = (photo) => {
  return photo.comments.length;
};

// Сортировка по кол-во комментариев - убывание
const sortCommentDescend = (pictureA, pictureB) => {
  const a = getCommentsAmount(pictureA);
  const b = getCommentsAmount(pictureB);

  return b - a;
};

// Очистка списка фотографий
const clearPictureList = (pictures) => {
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].outerHTML = '';
  }
};

const renderPictureListDefault = (photosDescription) => {
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
  const pictureListFragment = document.createDocumentFragment();
  const pictures = pictureList.querySelectorAll('.picture');
  clearPictureList(pictures);

  const discussedPictureList = photosDescription.slice().sort(sortCommentDescend);

  discussedPictureList.forEach((description) => {
    const pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = description.url;
    pictureItem.querySelector('.picture__likes').textContent = description.likes;
    pictureItem.querySelector('.picture__comments').textContent = description.comments.length;
    pictureListFragment.appendChild(pictureItem);
  });
  pictureList.appendChild(pictureListFragment);
  renderBigPicture(discussedPictureList);
};

const renderPictureListRandom = (photosDescription) => {
  const pictureListFragment = document.createDocumentFragment();
  const pictures = pictureList.querySelectorAll('.picture');
  clearPictureList(pictures);

  const randomPictureList = shuffle(photosDescription.slice()).slice(0, RANDOM_PICTURES_AMOUNT);

  randomPictureList.forEach((description) => {
    const pictureItem = pictureTemplate.cloneNode(true);
    pictureItem.querySelector('.picture__img').src = description.url;
    pictureItem.querySelector('.picture__likes').textContent = description.likes;
    pictureItem.querySelector('.picture__comments').textContent = description.comments.length;
    pictureListFragment.appendChild(pictureItem);
  });
  pictureList.appendChild(pictureListFragment);
  renderBigPicture(randomPictureList);
};

const renderComments = (index, photosDescription) => {
  const pictureListFragment = document.createDocumentFragment();
  for (let i = 0; i < photosDescription[index].comments.length; i++) {
    const commentItem = commentTemplate.cloneNode(true);

    commentItem.querySelector('.social__text').textContent = photosDescription[index].comments[i].message;
    commentItem.querySelector('.social__picture').src = photosDescription[index].comments[i].avatar;
    commentItem.querySelector('.social__picture').alt = photosDescription[index].comments[i].name;
    pictureListFragment.appendChild(commentItem);
  }
  commentList.appendChild(pictureListFragment);
};

export { renderPictureListDefault, renderComments, renderPictureListDiscussed, renderPictureListRandom };
