const getRandomNumber = function (min, max) {
  if (min < 0 || max < 0) {
    alert('Вы ввели отрицательное число. Допускаются только положительные числа.');
  } else if (min >= max) {
    alert('Минимальное число больше чем максимальное либо равно ему.');
  } else {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  }
}

const getMaxCharLength = function (string, maxLength) {
  return string.length <= maxLength ? true : false;
}

getMaxCharLength('Some text', 140);
getRandomNumber(0, 10);
