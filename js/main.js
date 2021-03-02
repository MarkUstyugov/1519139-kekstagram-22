import { renderPictureList } from './picture-list.js';
import { renderBigPicture } from './picture-popup.js';
import { renderPicturePreview, setUserFormSubmit } from './photo-preview.js';
import { getData } from './data.js';
import { failGetDataFromServer } from './util.js';

getData(
  (photos) => {
    renderPictureList(photos);
    renderBigPicture(photos);
  },
  () => { failGetDataFromServer() },
);

renderPicturePreview();
setUserFormSubmit();
