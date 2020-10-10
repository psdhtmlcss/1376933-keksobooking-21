'use strict';
(function() {
  const MAX_COUNT = 8;
  const MapPin = {
    WIDTH: 50,
    HEIGHT: 70,
    MAIN_WIDTH: 65,
    MAIN_HEIGHT: 87
  };

  const Mouse = {
    LEFT_KEY_BUTTON: 0
  };
  const Keys = {
    ENTER_KEY: 'Enter'
  };
  const similarAds = [];
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

  window.data.getAds();

  // map-pins.js
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

  // util.js
  const disabledForm = (elements, isTrue) => {
    for (let i = 0; i < elements.length; i++) {
      elements[i].disabled = isTrue;
    };
  };

  // main.js
  disabledForm(mapFiltersElements, true);
  disabledForm(adFormElements, true);

  const enabledForm = () => {
    disabledForm(mapFilters, false);
    disabledForm(adForm, false);
    createMapPinsFragment();
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

  // util.js
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

  // main.js
  mapPinMain.addEventListener('mousedown', onMousedown);
  document.addEventListener('keydown', onKeyPressEnter);

  // form.js
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
})();






