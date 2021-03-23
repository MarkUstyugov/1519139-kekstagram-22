import { isEscEvent } from './util.js';
import { uploadPreviewClearHandler } from './photo-preview.js';

const main = document.body.querySelector('main');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const successMessage = document.querySelector('#success').content.querySelector('.success');
const successButton = successMessage.querySelector('.success__button');
const errorButton = errorMessage.querySelector('.error__button');

// Удаление сообщений при нажатии ESC
const messageDeleteHandler = (evt) => {
  if (isEscEvent(evt)) {
    messageCloseHandler();
  }
};

// Удаление сообщений при клике вне его
const mouseOutHandler = (evt) => {
  const target = evt.target;
  if (!target.closest('.success__inner, .error__inner')) {
    messageCloseHandler();
  }
};

// Сообщение при успешной отправке данных
const onSuccess = () => {
  uploadPreviewClearHandler();
  openMessageSuccess();
};

// Сообщение при неудачной оправке данных
const onFail = () => {
  uploadPreviewClearHandler();
  openMessageError();
};

const openMessageError = () => {
  main.appendChild(errorMessage);
  document.addEventListener('keydown', messageDeleteHandler);
  document.addEventListener('click', mouseOutHandler);
  errorButton.addEventListener('click', messageCloseHandler);
}

const openMessageSuccess = () => {
  main.appendChild(successMessage);
  document.addEventListener('keydown', messageDeleteHandler);
  document.addEventListener('click', mouseOutHandler);
  successButton.addEventListener('click', messageCloseHandler);
}

const messageCloseHandler = () => {
  successMessage.remove();
  errorMessage.remove();
  document.removeEventListener('keydown', messageDeleteHandler);
  document.removeEventListener('click', mouseOutHandler);
}

export { onSuccess, onFail };
