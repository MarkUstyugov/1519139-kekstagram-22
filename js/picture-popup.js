import { photosDescreption, renderComments } from './picture-list.js';
import { isEscEvent } from './util.js';

const renderBigPicture = () => {

  const pictures = document.querySelector('.pictures');
  const bigPicture = document.querySelector('.big-picture');

  const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
  const bigPictureLikes = bigPicture.querySelector('.likes-count');
  const bigPictureComments = bigPicture.querySelector('.comments-count');
  const bigPictureDescription = bigPicture.querySelector('.social__caption');
  const bigPictureSocialCommentCount = bigPicture.querySelector('.social__comment-count');
  const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

  const picturesArray = pictures.querySelectorAll('.picture');
  const body = document.querySelector('body');

  const closeBigPicture = bigPicture.querySelector('.big-picture__cancel');
  const socialCommentList = bigPicture.querySelector('.social__comments');

  picturesArray.forEach((item, index) => {
    item.addEventListener('click', () => {

      bigPicture.classList.remove('hidden');
      body.classList.add('modal-open');
      bigPictureSocialCommentCount.classList.add('hidden');
      bigPictureCommentsLoader.classList.add('hidden');

      bigPictureImg.src = photosDescreption[index].url;
      bigPictureLikes.textContent = photosDescreption[index].likes;
      bigPictureComments.textContent = photosDescreption[index].comments.length;
      bigPictureDescription.textContent = photosDescreption[index].description;

      while (socialCommentList.firstChild) {
        socialCommentList.firstChild.remove();
      }

      renderComments(index);

      document.addEventListener('keydown', (evt) => {
        if (isEscEvent(evt)) {
          evt.preventDefault();
          bigPicture.classList.add('hidden');
        }
      });

      closeBigPicture.addEventListener('click', () => {
        bigPicture.classList.add('hidden');
      });
    });
  });
};

export { renderBigPicture };
