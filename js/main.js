'use strict';

// Переменные и функции для создания массива с похожими объявлениями
const MAX_COUNT = 8;
const similarAds = [];
// let i = 0;

function getRandom(min, max) {
  let x = Math.floor(Math.random() * (max - min) + min);
  return x;
};

// Как подставить в качестве агрумента строку с переменной i ?
// const generateData = function (string) {
//   let elements = [];
//   for (i; i < MAX_COUNT; i++) {
//     elements[i] = string;
//   }

//   return elements;
// };

const getAvatars = () => {
  let avatars = [];
  for (let i = 0; i < MAX_COUNT; i++) {
    avatars[i] = `img/avatars/user0${i + 1}.png`;
  }

  return avatars;
};

const getPhotos = () => {
  let photos = [];
  for (let i = 0; i < MAX_COUNT; i++) {
    photos[i] = `http://o0.github.io/assets/images/tokyo/hotel${i + 1}.jpg`;
  }

  return photos;
};

const getTitles = () => {
  let titles = [];
  for (let i = 0; i < MAX_COUNT; i++) {
    titles[i] = `Заголовок ${i + 1}`;
  }

  return titles;
};

const getAddresses = () => {
  let addresses = [];
  for (let i = 0; i < MAX_COUNT; i++) {
    addresses[i] = `${i + 1}00, 3${i + 1}0`;
  }

  return addresses;
};

const getPrices = () => {
  let prices = [];
  for (let i = 0; i < MAX_COUNT; i++) {
    prices[i] = +`${getRandom(1, 9)}000`;
  };

  return prices;
};

const getNumber = () => {
  let numbers = [];
  for (let i = 0; i < MAX_COUNT; i++) {
    numbers[i] = i + 1;
  };

  return numbers;
};

const getDescriptions = () => {
  let descriptions = [];
  for (let i = 0; i < MAX_COUNT; i++) {
    descriptions[i] = `Описание ${i + 1}`;
  }

  return descriptions;
};

// Функция для создания массива случайной длины
const getArrayElements = function (arr) {
  let strings = [];
  let maxCount = getRandom(1, 5);
  for (let i = 0; i < maxCount; i++) {
    let number = getRandom(0, 5);
    strings[i] = arr[number];
  }

  return strings;
};

// Функция, которая убирает повторяющие элементы из массива
const getUniqueElements = function (arr) {
  let elements = getArrayElements(arr);
  let uniqueElements = [];
  for (let i = 0; i < elements.length; i++) {
    let count = 0;
    for (let j = 0; j < elements.length; j++) {
      if (elements[j] === elements[i]) {
        count++;
      }
    }

    if (count < 2) {
      uniqueElements.push(elements[i]);
    }
  }

  // Как создать функцию, чтобы массив с фото всегда был непустым?
  return uniqueElements;
};

const avatars = getAvatars();
const titles = getTitles();
const addresses = getAddresses();
const prices = getPrices();
const types = ['palace', 'flat', 'house', 'bungalow'];
const someNumber = getNumber();
const checkInOut = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const descriptions = getDescriptions();
const photos = getPhotos();
let locationX = 0;
let locationY = 0;

const getSimilarAds = function (avatar, title, address, price, type, rooms, guests, checkin, checkout, feature, description, photos, locationX, locationY) {
  let ads = {};
  let author = {};
  let offer = {};
  let location = {};

  author.avatar = avatar;
  offer.title = title;
  offer.address = address;
  offer.price = price;
  offer.type = type;
  offer.rooms = rooms;
  offer.guests = guests;
  offer.checkin = checkin;
  offer.checkout = checkout;
  offer.feature = feature;
  offer.description = description;
  offer.photos = photos;

  location.x = locationX;
  location.y = locationY;

  ads.author = author;
  ads.offer = offer;
  ads.location = location;

  return ads;
};

const getAds = () => {
  for (let i = 0; i < MAX_COUNT; i++) {
    similarAds[i] = getSimilarAds(avatars[i], titles[i], addresses[i], prices[i], types[getRandom(0, 3)], someNumber[getRandom(1, 7)], someNumber[getRandom(1, 7)], checkInOut[getRandom(0, 2)], checkInOut[getRandom(0, 2)], getUniqueElements(features), descriptions[i], getUniqueElements(photos), locationX = getRandom(100, 600), locationY = getRandom(130, 630));
  }

  return similarAds;
};

const ads = getAds();

console.log(ads);

// Переменные и функции для создания меток на карте
const mapPinWidth = 50;
const mapPinHeight = 70;
const mapPinsFragment = document.createDocumentFragment();
const mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
const mapPins = document.querySelector('.map__pins');

const createMapPin = function (x, y, src, alt) {
  let mapPin = mapPinTemplate.cloneNode(true);
  let img = mapPin.querySelector('img');
  mapPin.style.left = `${x - mapPinWidth / 2}px`;
  mapPin.style.top = `${y - mapPinHeight}px`;
  img.src = src;
  img.alt = alt;

  return mapPin;
};

const createMapPinsFragment = () => {
  for (let i = 0; i < MAX_COUNT; i++) {
    mapPinsFragment.appendChild(createMapPin(ads[i].location.x, ads[i].location.y, ads[i].author.avatar, ads[i].offer.title));
  }
};

createMapPinsFragment();

mapPins.appendChild(mapPinsFragment);

document.querySelector('.map').classList.remove('map--faded');

