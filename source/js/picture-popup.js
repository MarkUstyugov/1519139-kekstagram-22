import { isEscEvent } from './util.js';

const pictures = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');

const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCommentsLoader = bigPicture.querySelector('.comments-loader');

const commentList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const closeBigPictureButton = bigPicture.querySelector('.big-picture__cancel');
const socialCommentList = bigPicture.querySelector('.social__comments');

const body = document.body;

const bigbigPictureSocialCommentCountCurrent = document.querySelector('.comments-count-current');

const COMMENTS_MAX_AMOUNT = 5;

let commentsCounter = null;
let commentsTotalAmount = null;
let commentsCurrentAmount = null;
let comments = [];

const commentsLoaderHandler = () => {
  loadComments();
}

const bigPictureOnEscCloseHandler = (evt) => {
  if (isEscEvent(evt)) {
    closeBigPicture();
  }
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', bigPictureOnEscCloseHandler);
  bigPictureCommentsLoader.removeEventListener('click', commentsLoaderHandler);
}

// Отрисовка комментариев
const renderCommentList = (commentsArray) => {
  comments = commentsArray;
  commentsCounter = 0;
  commentsCurrentAmount = 0;
  commentsTotalAmount = comments.length;
  loadComments();
  bigPictureCommentsLoader.addEventListener('click', commentsLoaderHandler);
};

// Загрузка комментариев
const loadComments = () => {
  if ((commentsTotalAmount - commentsCounter) <= 5) {
    bigPictureCommentsLoader.classList.add('hidden');
  }

  const commentsToShow = comments.slice(commentsCounter, commentsCounter + COMMENTS_MAX_AMOUNT);

  commentsToShow.forEach((comment) => {
    const avatarSrc = comment.avatar;
    const commentText = comment.message;
    const avatarAlt = comment.name;
    setComment(avatarSrc, commentText, avatarAlt);
  });

  commentsCounter += commentsToShow.length;
  bigbigPictureSocialCommentCountCurrent.textContent = (commentsCounter + commentsCurrentAmount);
};

// Создание комментария
const setComment = (avatarSrc, commentText, avatarName) => {
  const pictureListFragment = document.createDocumentFragment();
  const commentItem = commentTemplate.cloneNode(true);

  const avatarElement = commentItem.querySelector('.social__picture');
  const textElement = commentItem.querySelector('.social__text');

  avatarElement.src = avatarSrc;
  avatarElement.alt = avatarName;
  textElement.textContent = commentText;
  pictureListFragment.append(commentItem);
  commentList.append(pictureListFragment);
};

const renderBigPicture = (photosDescription) => {
  const picturesArray = pictures.querySelectorAll('.picture');

  picturesArray.forEach((item, index) => {
    item.addEventListener('click', () => {
      bigPicture.classList.remove('hidden');
      body.classList.add('modal-open');
      bigPictureCommentsLoader.classList.remove('hidden');

      bigPictureImg.src = photosDescription[index].url;
      bigPictureLikes.textContent = photosDescription[index].likes;
      bigPictureComments.textContent = photosDescription[index].comments.length;
      bigPictureDescription.textContent = photosDescription[index].description;

      while (socialCommentList.firstChild) {
        socialCommentList.firstChild.remove();
      }
      document.addEventListener('keydown', bigPictureOnEscCloseHandler);

      renderCommentList(photosDescription[index].comments);
    });
  });
};

closeBigPictureButton.addEventListener('click', () => {
  closeBigPicture();
});

export { renderBigPicture };
