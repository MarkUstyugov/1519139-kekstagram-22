/* global _:readonly */

import { renderPictureListDefault, renderPictureListDiscussed, renderPictureListRandom } from './picture-list.js';
import { renderPicturePreview, setUserFormSubmit } from './photo-preview.js';
import { getData } from './data.js';
import { failGetDataFromServer } from './util.js';
import { setDiscussedPhotos, setDefaultPhotos, setRandomPhotos } from './filter.js'

const RERENDER_DELAY = 500;

getData(
  (photos) => {
    renderPictureListDefault(photos);
    setDiscussedPhotos(_.debounce(() => renderPictureListDiscussed(photos), RERENDER_DELAY));
    setDefaultPhotos(_.debounce(() => renderPictureListDefault(photos), RERENDER_DELAY));
    setRandomPhotos(_.debounce(() => renderPictureListRandom(photos), RERENDER_DELAY));
  },
  () => { failGetDataFromServer() },
);

renderPicturePreview();
setUserFormSubmit();

