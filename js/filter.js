const filter = document.querySelector('.img-filters');
const filterDefaultButton = document.querySelector('#filter-default');
const filterRandomButton = document.querySelector('#filter-random');
const filterDiscussedButton = document.querySelector('#filter-discussed');

const loadFilter = () => {
  filter.classList.remove('img-filters--inactive');
};

const setDiscussedPhotos = (cb) => {
  filterDiscussedButton.addEventListener('click', (evt) => {
    evt.target.classList.add('img-filters__button--active');
    filterDefaultButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    cb();
  });
};

const setDefaultPhotos = (cb) => {
  filterDefaultButton.addEventListener('click', (evt) => {
    evt.target.classList.add('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    filterRandomButton.classList.remove('img-filters__button--active');
    cb();
  });
};

const setRandomPhotos = (cb) => {
  filterRandomButton.addEventListener('click', (evt) => {
    evt.target.classList.add('img-filters__button--active');
    filterDiscussedButton.classList.remove('img-filters__button--active');
    filterDefaultButton.classList.remove('img-filters__button--active');
    cb();
  });
};

export { setDiscussedPhotos, setDefaultPhotos, setRandomPhotos, loadFilter }
