const pictureList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const commentList = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const renderPictureList = (photosDescreption) => {
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

const renderComments = (index, photosDescreption) => {
  const pictureListFragment = document.createDocumentFragment();
  for (let i = 0; i < photosDescreption[index].comments.length; i++) {
    const commentItem = commentTemplate.cloneNode(true);
    commentItem.querySelector('.social__text').textContent = photosDescreption[index].comments[i].message;
    commentItem.querySelector('.social__picture').src = photosDescreption[index].comments[i].avatar;
    commentItem.querySelector('.social__picture').alt = photosDescreption[index].comments[i].name;
    pictureListFragment.appendChild(commentItem);
  }
  commentList.appendChild(pictureListFragment);
};

export { renderPictureList, renderComments };
