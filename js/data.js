import {getRandomNumber, getRandomArrayElement} from './util.js';

const PHOTO_DESCRIPTION_COUNT = 25;
const URL_PHOTO_PATH = 'photo/';
const AVATAR_PATH = 'img/avatar-';

const PHOTO_DESCRIPTION = [
  'Description-1',
  'Description-2',
  'Description-3',
  'Description-4',
  'Description-5',
  'Description-6',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Андрей',
  'Пётр',
  'Степан',
  'Иван',
  'Борис',
  'Анастасия',
  'Елена',
  'Алёна',
  'Екатерина',
  'Мария',
];

const [jpg, svg] = ['.jpg', '.svg'];

const createPhotoDescription = function () {
  const array = new Array();
  for (let i = 0; i < PHOTO_DESCRIPTION_COUNT; i++) {
    array[i] = {
      id: i + 1,
      url: `${URL_PHOTO_PATH}${i + 1}${jpg}`,
      description: getRandomArrayElement(PHOTO_DESCRIPTION),
      likes: getRandomNumber(100, 250),
      comments: createComment(),
    }
  }
  return array;
};

const createComment = function () {
  const array = new Array();
  for (let i = 0; i < getRandomNumber(1, 10); i++) {
    array[i] = {
      id: i + 1,
      avatar: `${AVATAR_PATH}${getRandomNumber(1, 6)}${svg}`,
      message: getRandomArrayElement(MESSAGES),
      name: getRandomArrayElement(NAMES),
    }
  }
  return array;
};

export {createPhotoDescription};
