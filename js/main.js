import { renderPictureList } from './picture-list.js';
import { renderPicturePreview, setUserFormSubmit } from './photo-preview.js';
import { getData } from './data.js';
import { failGetDataFromServer } from './util.js';
import { initDiscussedPhotosListener, initDefaultPhotosListener, initRandomPhotosListener } from './filter.js';
import { loadFilter } from './filter.js';

getData(
  (photos) => {
    loadFilter();
    renderPictureList(photos);
    initDiscussedPhotosListener(photos);
    initRandomPhotosListener(photos);
    initDefaultPhotosListener(photos);
  },
  failGetDataFromServer,
);

renderPicturePreview();
setUserFormSubmit();
