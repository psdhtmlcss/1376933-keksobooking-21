'use strict';

const MAX_COUNT = 8;
const MAX_LOCATION = 1000;
const MapPin = {
  WIDTH: 50,
  HEIGHT: 70,
  MAIN_WIDTH: 65,
  MAIN_HEIGHT: 87
};
const LOCATION_Y_MIN = 130;
const LOCATION_Y_MAX = 630;
const Mouse = {
  LEFT_KEY_BUTTON: 0
};
const Keys = {
  ENTER_KEY: 'Enter'
};
const similarAds = [];
const types = ['palace', 'flat', 'house', 'bungalow'];
const checkInOut = ['12:00', '13:00', '14:00'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const map = document.querySelector('.map');
const mapPinsFragment = document.createDocumentFragment();
const mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
const mapPins = document.querySelector('.map__pins');
const mapPinMain = mapPins.querySelector('.map__pin--main');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('.map__filter');
const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const inputAddress = adForm.querySelector('#address');
const rooms = adForm.querySelector('select[name="rooms"]');
const capacity = adForm.querySelector('select[name="capacity"]');

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
          'capacity': 1,
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
  mapPin.style.left = `${pin.location.x - MapPin.WIDTH / 2}px`;
  mapPin.style.top = `${pin.location.y - MapPin.HEIGHT}px`;
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

// createMapPinsFragment();

const disabledForm = (elements, isTrue) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = isTrue;
  };
};

disabledForm(mapFiltersElements, true);
disabledForm(adFormElements, true);

const enabledForm = () => {
  disabledForm(mapFilters, false);
  disabledForm(adForm, false);
  adForm.classList.remove('ad-form--disabled');
  map.classList.remove('map--faded');
  mapPinMain.removeEventListener('mousedown', onMousedown);
  document.removeEventListener('keydown', onKeyPressEnter);
};

const getInitialCoordinates = () => {
  inputAddress.value = `${Math.floor(mapPinMain.offsetTop - MapPin.MAIN_WIDTH / 2)}, ${Math.floor(mapPinMain.offsetLeft - MapPin.MAIN_WIDTH / 2)}`;
};

getInitialCoordinates();

const getCoordinatesAfterActivate = () => {
  inputAddress.value = `${Math.floor(mapPinMain.offsetTop - MapPin.MAIN_HEIGHT)}, ${Math.floor(mapPinMain.offsetLeft - MapPin.MAIN_WIDTH / 2)}`;
};

const onMousedown = (evt) => {
  if (evt.button === Mouse.LEFT_KEY_BUTTON) {
    getCoordinatesAfterActivate();
    enabledForm();
  }
};

const onKeyPressEnter = (evt) => {
  if (evt.key === Keys.ENTER_KEY && evt.target.classList.contains('map__pin--main')) {
    getCoordinatesAfterActivate();
    enabledForm();
  }
};

mapPinMain.addEventListener('mousedown', onMousedown);
document.addEventListener('keydown', onKeyPressEnter);

const checkCapacity = () => {
  let roomsValue = Number(rooms.value);
  let capacityValue = Number(capacity.value);

  if (roomsValue < capacityValue) {
    capacity.setCustomValidity('Количество гостей может быть не больше количества комнат');
  } else if (roomsValue === 100 && capacityValue !== 0) {
    capacity.setCustomValidity('Такое количество комнат не для гостей');
  } else if (roomsValue !== 100 && capacityValue === 0) {
    capacity.setCustomValidity('Этот вариант подходит только для 100 комнат');
  } else {
    capacity.setCustomValidity('');
  };
};

rooms.addEventListener('change', function () {
  checkCapacity();
  capacity.reportValidity();
});

capacity.addEventListener('change', function () {
  checkCapacity();
  capacity.reportValidity();
});





