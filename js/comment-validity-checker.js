const MAX_COMMENT_LENGTH = 140;
const textArea = document.querySelector('.text__description');

const commentValidityChecker = (evt) => {
  const textAreaValue = evt.target.value;
  const textAreaCurrentLength = textAreaValue.length;

  if (textAreaCurrentLength > MAX_COMMENT_LENGTH) {
    textArea.setCustomValidity('Максимальная длинна сообщения 140 символов');
  } else {
    textArea.setCustomValidity('');
  }

  textArea.reportValidity();
}

export { commentValidityChecker }

