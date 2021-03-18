const hashtagInput = document.querySelector('.text__hashtags');

const REGEXP = /^#{1}[a-zа-я0-9]{1,19}$/i;
const MAX_HASHTAG_NUMBER = 5;
let hashtagsArray = new Array();

const hashtagErrorChecker = (inputArray) => {
  const arrayLength = inputArray.length;

  let patternErrorCounter = false;
  let repeatedTagErrorCounter = false;

  inputArray.forEach((item, index, array) => {
    for (let i = index; i < (arrayLength - 1); i++) {
      if (item === array[i + 1]) {
        return repeatedTagErrorCounter = true;
      }
    }
  });

  if (repeatedTagErrorCounter) {
    return 'Хеш-теги не должны повторяться';
  }

  if (arrayLength > MAX_HASHTAG_NUMBER) {
    return 'Максимальное кол-во хеш-тегов 5';
  }

  inputArray.forEach((item) => {
    if (!REGEXP.test(item)) {
      return patternErrorCounter = true;
    }
  });

  if (patternErrorCounter) {
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

