import { renderPictureListDiscussed, renderPictureListRandom, renderPictureList } from './picture-list.js';
import { debounce } from './util.js';

const filter = document.querySelector('.img-filters');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

const RERENDER_DELAY = 500;

const debouncedRenderPictureListDiscussed = debounce((photos) => renderPictureListDiscussed(photos), RERENDER_DELAY);
const debouncedRenderPictureListRandom = debounce((photos) => renderPictureListRandom(photos), RERENDER_DELAY);
const debouncedRenderPictureListDefault = debounce((photos) => renderPictureList(photos), RERENDER_DELAY);

const loadFilter = () => {
  filter.classList.remove('img-filters--inactive');
};

const initDiscussedPhotosListener = (photos) => {
  filterDiscussedButton.addEventListener('click', (evt) => {
    evt.target.classList.add('img-filters__button--active');
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    debouncedRenderPictureListDiscussed(photos);
  });
};

const initDefaultPhotosListener = (photos) => {
  filterDefaultButton.addEventListener('click', (evt) => {
    evt.target.classList.add('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    debouncedRenderPictureListDefault(photos);
  });
};

const initRandomPhotosListener = (photos) => {
  filterRandomButton.addEventListener('click', (evt) => {
    evt.target.classList.add('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    filterDefaultButton.classList.remove('img-filters__button--active');
    debouncedRenderPictureListRandom(photos);
  });
};

export { initDiscussedPhotosListener, initDefaultPhotosListener, initRandomPhotosListener, loadFilter }

