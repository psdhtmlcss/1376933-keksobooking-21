'use strict';

const MAX_COUNT = 8;
const MAX_LOCATION = 1000;
const MAPPINWIDTH = 50;
const MAPPINHEIGHT = 70;
const LOCATION_Y_MIN = 130;
const LOCATION_Y_MAX = 630;
const similarAds = [];
const types = ['palace', 'flat', 'house', 'bungalow'];
const checkInOut = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const map = document.querySelector('.map');
const mapPinsFragment = document.createDocumentFragment();
const mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
const mapPins = document.querySelector('.map__pins');

const getRandom = (min, max) => {
  let x = Math.floor(Math.random() * (max - min) + min);
  return x;
};

const shaffleArray = (a) => {
  let i;
  let j;
  let x;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[j] = x;
  }

  return a;
};

const getPhotos = () => {
  let photos = [];
  for (let i = 0; i < MAX_COUNT; i++) {
    photos.push(`http://o0.github.io/assets/images/tokyo/hotel${i + 1}.jpg`);
  }

  return photos;
};

const photos = getPhotos();

const getAds = () => {
  for (let i = 0; i < MAX_COUNT; i++) {
    similarAds.push(
      {
        'author': {
          'avatar': `img/avatars/user0${i + 1}.png`
        },
        'offer': {
          'title': `Заголовок ${i + 1}`,
          'address': `${getRandom(1, MAX_LOCATION)}, ${1, MAX_LOCATION}`,
          'price': 0,
          'type': `${types[getRandom(0, types.length - 1)]}`,
          'rooms': 1,
          'guests': 1,
          'checkin': `${checkInOut[getRandom(0, checkInOut.length - 1)]}`,
          'checkout': `${checkInOut[getRandom(0, checkInOut.length - 1)]}`,
          'features': shaffleArray(features).slice(0, getRandom(0, features.length)),
          'description': `Описание ${i + 1}`,
          'photos': shaffleArray(photos).slice(0, getRandom(0, photos.length))
        },
        'location': {
          'x': getRandom(1, map.offsetWidth),
          'y': getRandom(LOCATION_Y_MIN, LOCATION_Y_MAX)
        }
      }
    )
  };
};

getAds();

const createMapPin = function (pin) {
  let mapPin = mapPinTemplate.cloneNode(true);
  let img = mapPin.querySelector('img');
  mapPin.style.left = `${pin.location.x - MAPPINWIDTH / 2}px`;
  mapPin.style.top = `${pin.location.y - MAPPINHEIGHT}px`;
  img.src = pin.author.avatar;
  img.alt = pin.offer.title;

  return mapPin;
};

const createMapPinsFragment = () => {
  for (let i = 0; i < MAX_COUNT; i++) {
    mapPinsFragment.appendChild(createMapPin(similarAds[i]));
  };

  mapPins.appendChild(mapPinsFragment);
};

createMapPinsFragment();

map.classList.remove('map--faded');

