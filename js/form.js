'use strict';
(function () {
  const pinMain = window.pins.pins.querySelector('.map__pin--main');
  const adForm = document.querySelector('.ad-form');
  const formElements = document.querySelectorAll('.ad-form__element, .map__filter, .map__features');
  const inputAddress = adForm.querySelector('#address');
  const rooms = adForm.querySelector('select[name="rooms"]');
  const capacity = adForm.querySelector('select[name="capacity"]');

  const getCoordinates = () => {
    let height;
    if (window.data.map.classList.contains('map--faded')) {
      height = window.pins.PinProperties.MAIN_WIDTH / 2;
    } else {
      height = window.pins.PinProperties.MAIN_HEIGHT;
    }

    inputAddress.value = `${Math.floor(pinMain.offsetLeft + height)}, ${Math.floor(pinMain.offsetTop + height)}`;
  };

  getCoordinates();

  const toggleForm = (elements) => {
    elements.forEach(function (value) {
      value.disabled = !value.disabled;
    });
  };

  toggleForm(formElements);

  const enabledForm = () => {
    adForm.classList.remove('ad-form--disabled');
    window.data.map.classList.remove('map--faded');
    pinMain.removeEventListener('mousedown', onMousedown);
    document.removeEventListener('keydown', onKeyPressEnter);
    toggleForm(formElements);
    getCoordinates();
    window.pins.createPinsFragment();
    window.popup.createPopup(window.pins.similarAds[0]);
  };

  const onMousedown = (evt) => {
    window.util.isOnMousedown(evt, enabledForm);
  };

  const onKeyPressEnter = (evt) => {
    if (evt.target.classList.contains('map__pin--main')) {
      window.util.isPressEnter(evt, enabledForm);
    }
  };

  pinMain.addEventListener('mousedown', onMousedown);
  document.addEventListener('keydown', onKeyPressEnter);

  const checkCapacity = () => {
    let roomsValue = parseInt(rooms.value, 10);
    let capacityValue = parseInt(capacity.value, 10);

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
