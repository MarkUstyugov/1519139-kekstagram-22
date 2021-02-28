import { renderPictureList } from './picture-list.js';
import { renderBigPicture } from './picture-popup.js';
import { renderPicturePreview, setUserFormSubmit } from './photo-preview.js';
import { getData } from './data.js';

getData((photos) => {
  renderPictureList(photos);
  renderBigPicture(photos);
});

renderPicturePreview();
setUserFormSubmit();
