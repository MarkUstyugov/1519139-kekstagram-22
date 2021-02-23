import { isEscEvent } from './util.js';

const renderPicturePreview = () => {
  const body = document.body;
  const downloadFileButton = document.querySelector('#upload-file');
  const imgUploadOverlay = document.querySelector('.img-upload__overlay');
  const uploadCancelButton = document.querySelector('#upload-cancel');

  const uploadPreview = document.querySelector('.img-upload__preview');
  const imgUploadPreview = uploadPreview.querySelector('img');
  const scaleControl = document.querySelector('.scale__control--value');
  const scaleControlSmaller = document.querySelector('.scale__control--smaller');
  const scaleControlBigger = document.querySelector('.scale__control--bigger');
  const effectsRadioButtons = document.querySelectorAll('input[name=effect]');
  const slider = document.querySelector('.effect-level__slider');
  const currentFilterValue = document.querySelector('input[name=current-filter]');

  const SCALE_CONTROL_INITIAL_VALUE = 100;
  const SCALE_CONTROL_MIN = 25;
  const SCALE_CONTROL_MAX = 100;
  const SCALE_CONTROL_STEP = 25;

  let scaleControlNumber = null;

  // Загрузка превью изображения
  const onDownloadFileButtonChange = () => {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    scaleControlNumber = SCALE_CONTROL_INITIAL_VALUE;
    scaleControl.value = `${scaleControlNumber}%`;
    imgUploadPreview.style.filter = '';
    imgUploadPreview.className = 'effects__preview--none';
    slider.style.display = 'none';

    document.addEventListener('keydown', onPhotoPreviewEscKey);
  };

  const onPhotoPreviewEscKey = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      clearUploadPreview();
    }
  };

  // Очиста превью изображения
  const clearUploadPreview = () => {
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    downloadFileButton.value = '';
    imgUploadPreview.className = '';
    uploadPreview.style = '';

    document.removeEventListener('keydown', onPhotoPreviewEscKey)
  };

  downloadFileButton.addEventListener('change', onDownloadFileButtonChange);
  uploadCancelButton.addEventListener('click', clearUploadPreview);

  // Изменение размера изображения
  scaleControlSmaller.addEventListener('click', () => {
    if (scaleControlNumber > SCALE_CONTROL_MIN && scaleControlNumber <= SCALE_CONTROL_MAX) {
      scaleControlNumber -= SCALE_CONTROL_STEP;
      scaleControl.value = `${scaleControlNumber}%`;
      uploadPreview.style.transform = `scale(0.${scaleControlNumber})`;
    }
  });

  scaleControlBigger.addEventListener('click', () => {
    if (scaleControlNumber >= SCALE_CONTROL_MIN && scaleControlNumber < SCALE_CONTROL_MAX) {
      scaleControlNumber += SCALE_CONTROL_STEP;
      scaleControl.value = `${scaleControlNumber}%`;
      uploadPreview.style.transform = `scale(0.${scaleControlNumber})`;
      if (scaleControlNumber === SCALE_CONTROL_MAX) {
        scaleControl.value = `${scaleControlNumber}%`;
        uploadPreview.style.transform = 'scale(1)';
      }
    }
  });

  // Слайдер
  window.noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: (value) => {
        return value.toFixed(Number.isInteger(value) ? 0 : 1);
      },
      from: (value) => {
        return parseFloat(value);
      },
    },
  });

  // Слайдер - применение эфектов
  for (let i = 0; i < effectsRadioButtons.length; i++) {
    effectsRadioButtons[i].addEventListener('change', (evt) => {
      if (evt.target.value === 'none') {
        applyNoneEffect();
      } else if (evt.target.value === 'sepia') {
        applySepiaEffect();
      } else if (evt.target.value === 'chrome') {
        applyChromeEffect();
      } else if (evt.target.value === 'heat') {
        applyHeatEffect();
      } else if (evt.target.value === 'phobos') {
        applyPhobosEffect();
      } else if (evt.target.value === 'marvin') {
        applyMarvinEffect();
      }
    });
  }

  // Эффекты для слайдера
  const applyNoneEffect = () => {
    imgUploadPreview.style.filter = '';
    imgUploadPreview.className = 'effects__preview--none';
    slider.style.display = 'none';
    currentFilterValue.value = 'none';
  }

  const applyChromeEffect = () => {
    imgUploadPreview.style.filter = '';
    imgUploadPreview.className = 'effects__preview--chrome';
    slider.style.display = 'block';

    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    slider.noUiSlider.on('update', (values, handle) => {
      imgUploadPreview.style.filter = `grayscale(${values[handle]})`;
      currentFilterValue.value = `grayscale(${values[handle]})`;
    });
  }

  const applySepiaEffect = () => {
    imgUploadPreview.style.filter = '';
    imgUploadPreview.className = 'effects__preview--sepia';
    slider.style.display = 'block';

    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
    slider.noUiSlider.on('update', (values, handle) => {
      imgUploadPreview.style.filter = `sepia(${values[handle]})`;
      currentFilterValue.value = `sepia(${values[handle]})`;
    });
  }

  const applyMarvinEffect = () => {
    imgUploadPreview.style.filter = '';
    imgUploadPreview.className = 'effects__preview--marvin';
    currentFilterValue.value = '';
    slider.style.display = 'block';
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
    slider.noUiSlider.on('update', (values, handle) => {
      imgUploadPreview.style.filter = `invert(${values[handle]}%)`;
      currentFilterValue.value = `invert(${values[handle]}%)`;
    });
  }

  const applyPhobosEffect = () => {
    imgUploadPreview.style.filter = '';
    imgUploadPreview.className = 'effects__preview--phobos';
    slider.style.display = 'block';
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    slider.noUiSlider.on('update', (values, handle) => {
      imgUploadPreview.style.filter = `blur(${values[handle]}px)`;
      currentFilterValue.value = `blur(${values[handle]}px)`;
    });
  }

  const applyHeatEffect = () => {
    imgUploadPreview.style.filter = '';
    imgUploadPreview.className = 'effects__preview--heat';
    slider.style.display = 'block';
    slider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    slider.noUiSlider.on('update', (values, handle) => {
      imgUploadPreview.style.filter = `brightness(${values[handle]})`;
      currentFilterValue.value = `brightness(${values[handle]})`;
    });
  }
}

export { renderPicturePreview };
