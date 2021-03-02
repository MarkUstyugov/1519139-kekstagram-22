import { renderComments } from './picture-list.js';
import { isEscEvent } from './util.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');

const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureSocialCommentCount = bigPicture.querySelector('.social__comment-count');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

const closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');
const socialCommentList = bigPicture.querySelector('.social__comments');

const body = document.body;

const onEscCloseBigPicture = (evt) => {
  if (isEscEvent(evt)) {
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscCloseBigPicture);
}

closeBigPictureButton.addEventListener('click', () => {
  closeBigPicture();
});

const renderBigPicture = (photosDescription) => {
  const picturesArray = pictures.querySelectorAll('.picture');

  picturesArray.forEach((item, index) => {
    item.addEventListener('click', () => {
      bigPicture.classList.remove('hidden');
      body.classList.add('modal-open');
      bigPictureSocialCommentCount.classList.add('hidden');
      bigPictureCommentsLoader.classList.add('hidden');

      bigPictureImg.src = photosDescription[index].url;
      bigPictureLikes.textContent = photosDescription[index].likes;
      bigPictureComments.textContent = photosDescription[index].comments.length;
      bigPictureDescription.textContent = photosDescription[index].description;

      while (socialCommentList.firstChild) {
        socialCommentList.firstChild.remove();
      }
      document.addEventListener('keydown', onEscCloseBigPicture);
      renderComments(index, photosDescription);
    });
  });
};

export { renderBigPicture };
