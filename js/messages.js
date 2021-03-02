import { isEscEvent } from './util.js';
import { clearUploadPreview } from './photo-preview.js';

const main = document.body.querySelector('main');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const successButton = successMessage.querySelector('.success__button');
const errorButton = errorMessage.querySelector('.error__button');

// Удаление сообщений при нажатии ESC
const deleteMessage = (evt) => {
  if (isEscEvent(evt)) {
    closeMessage();
  }
};

// Удаление сообщений при клике вне его
const onMouseOut = (evt) => {
  const target = evt.target;
  if (!target.closest('.success__inner, .error__inner')) {
    closeMessage();
  }
};

// Сообщение при успешной отправке данных
const onSuccess = () => {
  clearUploadPreview();
  openMessageSuccess();
};

// Сообщение при неудачной оправке данных
const onFail = () => {
  clearUploadPreview();
  openMessageError();
};

const openMessageError = () => {
  main.appendChild(errorMessage);
  document.addEventListener('keydown', deleteMessage);
  document.addEventListener('click', onMouseOut);
  errorButton.addEventListener('click', closeMessage);
}

const openMessageSuccess = () => {
  main.appendChild(successMessage);
  document.addEventListener('keydown', deleteMessage);
  document.addEventListener('click', onMouseOut);
  successButton.addEventListener('click', closeMessage);
}

const closeMessage = () => {
  successMessage.remove();
  errorMessage.remove();
  document.removeEventListener('keydown', deleteMessage);
  document.removeEventListener('click', onMouseOut);
}

export { onSuccess, onFail };
