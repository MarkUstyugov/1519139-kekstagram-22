import '../nouislider/nouislider.js';
import { isEscEvent } from './util.js';

const renderPicturePreview = function () {
  const body = document.querySelector('body');
  const downloadFileButton = document.querySelector('#upload-file');
  const imgUploadOverlay = document.querySelector('.img-upload__overlay');
  const uploadCancelButton = document.querySelector('#upload-cancel');

  const uploadPreview = document.querySelector('.img-upload__preview');
  const imgUplodPreview = uploadPreview.querySelector('img');
  const scaleControl = document.querySelector('.scale__control--value');
  const scaleControlSmoller = document.querySelector('.scale__control--smaller');
  const scaleControlBigger = document.querySelector('.scale__control--bigger');
  const effectsRadioButtons = document.querySelectorAll('input[name=effect]');
  const slider = document.querySelector('.effect-level__slider');
  const currentFilterValue = document.querySelector('input[name=current-filter]');

  let scaleControlNumber = 0;

  downloadFileButton.addEventListener('change', () => {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
    scaleControlNumber = 100;
    scaleControl.value = `${scaleControlNumber}${'%'}`;

    imgUplodPreview.style.filter = '';
    imgUplodPreview.className = '';
    slider.style.display = 'none';
  });

  const clearUploadPreview = () => {
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    downloadFileButton.value = '';
    imgUplodPreview.className = '';
    imgUplodPreview.className = 'effects__preview--none';
    uploadPreview.style = '';
    scaleControlNumber = 100;
  };

  uploadCancelButton.addEventListener('click', () => {
    clearUploadPreview();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      clearUploadPreview();
    }
  });

  scaleControlSmoller.addEventListener('click', () => {
    if (scaleControlNumber > 25 && scaleControlNumber <= 100) {
      scaleControlNumber -= 25;
      scaleControl.value = `${scaleControlNumber}${'%'}`;
      uploadPreview.style.transform = `scale(0.${scaleControlNumber})`;
    }
  });

  scaleControlBigger.addEventListener('click', () => {
    if (scaleControlNumber >= 25 && scaleControlNumber < 100) {
      scaleControlNumber += 25;
      scaleControl.value = `${scaleControlNumber}${'%'}`;
      uploadPreview.style.transform = `scale(0.${scaleControlNumber})`;
      if (scaleControlNumber === 100) {
        uploadPreview.style.transform = 'scale(1)';
      }
    }
  });

  // Слайдер
  noUiSlider.create(slider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  // Слайдер - применение эфектов
  for (let i = 0; i < effectsRadioButtons.length; i++) {
    effectsRadioButtons[i].addEventListener('change', () => {
      if (effectsRadioButtons[i].checked && effectsRadioButtons[i].value === 'chrome') {
        imgUplodPreview.style.filter = '';
        imgUplodPreview.className = '';
        imgUplodPreview.classList.add(`effects__preview--${effectsRadioButtons[i].value}`);
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
          imgUplodPreview.style.filter = `grayscale(${values[handle]})`;
          currentFilterValue.value = `grayscale(${values[handle]})`;
          console.log(currentFilterValue.value);
        });
      } else if (effectsRadioButtons[i].checked && effectsRadioButtons[i].value === 'sepia') {
        imgUplodPreview.style.filter = '';
        imgUplodPreview.className = '';
        imgUplodPreview.classList.add(`effects__preview--${effectsRadioButtons[i].value}`);
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
          imgUplodPreview.style.filter = `sepia(${values[handle]})`;
          currentFilterValue.value = `sepia(${values[handle]})`;
          console.log(currentFilterValue.value);
        });
      } else if (effectsRadioButtons[i].checked && effectsRadioButtons[i].value === 'none') {
        imgUplodPreview.style.filter = '';
        imgUplodPreview.className = '';
        imgUplodPreview.classList.add(`effects__preview--${effectsRadioButtons[i].value}`);
        slider.style.display = 'none';
        currentFilterValue.value = 'none';
      } else if (effectsRadioButtons[i].checked && effectsRadioButtons[i].value === 'heat') {
        imgUplodPreview.style.filter = '';
        imgUplodPreview.className = '';
        imgUplodPreview.classList.add(`effects__preview--${effectsRadioButtons[i].value}`);
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
          imgUplodPreview.style.filter = `brightness(${values[handle]})`;
          currentFilterValue.value = `brightness(${values[handle]})`;
          console.log(currentFilterValue.value);
        });
      } else if (effectsRadioButtons[i].checked && effectsRadioButtons[i].value === 'phobos') {
        imgUplodPreview.style.filter = '';
        imgUplodPreview.className = '';
        imgUplodPreview.classList.add(`effects__preview--${effectsRadioButtons[i].value}`);
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
          imgUplodPreview.style.filter = `blur(${values[handle]}px)`;
          currentFilterValue.value = `blur(${values[handle]}px)`;
          console.log(currentFilterValue.value);
        });
      }
      else if (effectsRadioButtons[i].checked && effectsRadioButtons[i].value === 'marvin') {
        imgUplodPreview.style.filter = '';
        imgUplodPreview.className = '';
        imgUplodPreview.classList.add(`effects__preview--${effectsRadioButtons[i].value}`);
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
          imgUplodPreview.style.filter = `invert(${values[handle]}%)`;
          currentFilterValue.value = `invert(${values[handle]}%)`;
          console.log(currentFilterValue.value);
        });
      }
    });
  }
}

export { renderPicturePreview };
