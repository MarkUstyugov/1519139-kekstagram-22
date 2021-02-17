const getRandomNumber = function (min, max) {
  if (min < 0 || max < 0) {
    alert('Вы ввели отрицательное число. Допускаются только положительные числа.');
  } else if (min >= max) {
    alert('Минимальное число больше чем максимальное либо равно ему.');
  } else {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
};

const getRandomArrayElement = function (elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const getMaxCharLength = function (string, maxLength) {
  return string.length <= maxLength;
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const isEnterEvent = (evt) => {
  return evt.key === 'Enter';
};

(getMaxCharLength('Some string', 140));

export { getRandomNumber, getRandomArrayElement, isEscEvent,  isEnterEvent};
