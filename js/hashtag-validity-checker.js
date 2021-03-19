const hashtagInput = document.querySelector('.text__hashtags');

const REGEXP = /^#[a-zа-я0-9]{1,19}$/i;
const MAX_HASHTAG_NUMBER = 5;

const hashtagErrorChecker = (inputArray) => {
  const arrayLength = inputArray.length;
  const patternErrorCounter = inputArray.some((item) => !REGEXP.test(item));

  if (arrayLength > MAX_HASHTAG_NUMBER) {
    return 'Максимальное кол-во хеш-тегов 5';
  }

  if (patternErrorCounter) {
    return 'Хэш-тег должен начинаться с символа #, без пробелов, содержать только цифры и буквы, и быть не более 20 символов';
  }

  if (new Set(inputArray).size !== arrayLength) {
    return 'Хеш-теги не должны повторяться';
  }
  return '';
};

const hashtagValidityChecker = (evt) => {
  const hashValue = evt.target.value;
  const hashtagsArray = hashValue.split(' ');
  const errorMessage = hashtagErrorChecker(hashtagsArray);

  if (hashValue === '') {
    hashtagInput.setCustomValidity('');
  } else if (errorMessage !== '') {
    hashtagInput.setCustomValidity(errorMessage);
  } else {
    hashtagInput.setCustomValidity('');
  }

  hashtagInput.reportValidity();
};

export { hashtagValidityChecker };

