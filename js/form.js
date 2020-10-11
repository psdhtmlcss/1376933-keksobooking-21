'use strict';
(function () {
  const PinProperties = {
    WIDTH: 50,
    HEIGHT: 70,
    MAIN_WIDTH: 65,
    MAIN_HEIGHT: 87
  };
  const map = document.querySelector('.map');
  const pins = document.querySelector('.map__pins');
  const pinMain = pins.querySelector('.map__pin--main');
  const mapFilters = document.querySelector('.map__filters');
  const adForm = document.querySelector('.ad-form');
  const inputAddress = adForm.querySelector('#address');
  const rooms = adForm.querySelector('select[name="rooms"]');
  const capacity = adForm.querySelector('select[name="capacity"]');

  window.form = {
    disabledForm: function (elements, isTrue) {
      for (let i = 0; i < elements.length; i++) {
        elements[i].disabled = isTrue;
      };
    },

    getInitialCoordinates: function () {
      inputAddress.value = `${Math.floor(pinMain.offsetTop - PinProperties.MAIN_WIDTH / 2)}, ${Math.floor(pinMain.offsetLeft - PinProperties.MAIN_WIDTH / 2)}`;
    },

    getCoordinatesAfterActivate: function () {
      inputAddress.value = `${Math.floor(pinMain.offsetTop - PinProperties.MAIN_HEIGHT)}, ${Math.floor(pinMain.offsetLeft - PinProperties.MAIN_WIDTH / 2)}`;
    },

    enabledForm: function () {
      window.form.disabledForm(mapFilters, false);
      window.form.disabledForm(adForm, false);
      window.form.getCoordinatesAfterActivate();
      window.pins.createPinsFragment();
      adForm.classList.remove('ad-form--disabled');
      map.classList.remove('map--faded');
      pinMain.removeEventListener('mousedown', onMousedown);
      document.removeEventListener('keydown', onKeyPressEnter);
    }
  };

  const onMousedown = (evt) => {
    window.util.isOnMousedown(evt, window.form.enabledForm);
  };

  const onKeyPressEnter = (evt) => {
    if (evt.target.classList.contains('map__pin--main')) {
      window.util.isPressEnter(evt, window.form.enabledForm);
    }
  };

  pinMain.addEventListener('mousedown', onMousedown);
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
})();
