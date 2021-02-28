import { isEscEvent } from './util.js';
import { clearUploadPreview } from './photo-preview.js';

const main = document.body.querySelector('main');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const successButton = successMessage.querySelector('.success__button');
const errorButton = errorMessage.querySelector('.error__button');

// Удаление сообщений при нажатии ESC
const deleteMessage = () => {
  if (isEscEvent) {
    successMessage.remove();
    errorMessage.remove();
  }
};

// Удаление сообщений при клике вне его
const onMouseOut = (evt) => {
  let target = evt.target;
  if (!target.closest('.success__button') && !target.closest('.error__button')) {
    if (!target.closest('.success__inner') && !target.closest('.error__inner')) {
      successMessage.remove();
      errorMessage.remove();
    }
  }
};

// Сообщение при успешной отправке данных
const onSuccess = () => {
  clearUploadPreview();
  main.appendChild(successMessage);
  document.addEventListener('keydown', deleteMessage);
  successButton.addEventListener('click', () => {
    successMessage.remove();
  });

  document.addEventListener('click', onMouseOut);
};

// Сообщение при неудачной оправке данных
const onFail = () => {
  main.appendChild(errorMessage);
  clearUploadPreview();
  document.addEventListener('keydown', deleteMessage);
  errorButton.addEventListener('click', () => {
    errorMessage.remove();
  });

  document.addEventListener('click', onMouseOut);
};

export { onSuccess, onFail };
