const hashtagInput = document.querySelector('.text__hashtags');

const REGEXP = /^#{1}[a-zа-я0-9]{1,19}$/i;
const MAX_HASHTAG_NUMBER = 5;
let hashtagsArray = new Array();

const hashtagErrorChecker = (inputArray) => {
  const arrayLength = inputArray.length;

  let patternErrorCounter = 0;
  let repeatedTagErrorCounter = 0;
  let tagNumberErrorCounter = 0;

  inputArray.forEach((item, index, array) => {
    for (let i = index; i < (arrayLength - 1); i++) {
      repeatedTagErrorCounter = (item === array[i + 1]) ? (repeatedTagErrorCounter + 1) : repeatedTagErrorCounter;
    }
  });

  if (repeatedTagErrorCounter > 0) {
    return 'Хеш-теги не должны повторяться';
  }

  tagNumberErrorCounter = (arrayLength > MAX_HASHTAG_NUMBER) ? ++tagNumberErrorCounter : tagNumberErrorCounter;
  if (tagNumberErrorCounter > 0) {
    return 'Максимальное кол-во хеш-тегов 5';
  }

  inputArray.forEach((item) => {
    patternErrorCounter = (REGEXP.test(item)) ? patternErrorCounter : ++patternErrorCounter;
  });
  if (patternErrorCounter > 0) {
    return 'Хэш-тег должен начинаться с символа #, без пробелов, содержать только цифры и буквы, и быть не более 20 символов';
  }

  return '';
}

const hashtagValidityChecker = (evt) => {
  const hashValue = evt.target.value;
  hashtagsArray = hashValue.split(' ');
  let errorMessage = hashtagErrorChecker(hashtagsArray);

  if (hashValue === '') {
    hashtagInput.setCustomValidity('');
  } else if (errorMessage !== '') {
    hashtagInput.setCustomValidity(errorMessage);
  } else {
    hashtagInput.setCustomValidity('');
  }

  hashtagInput.reportValidity();
}

export { hashtagValidityChecker }

