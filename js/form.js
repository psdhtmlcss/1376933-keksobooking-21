'use strict';
  const adForm = document.querySelector(`.ad-form`);
  const filterForm = document.querySelector(`.map__filters`);
  const btnReset = adForm.querySelector(`.ad-form__reset`);
  const formElements = document.querySelectorAll(`.ad-form-header, .ad-form__element, .map__filter, .map__features`);
  const inputAddress = adForm.querySelector(`#address`);
  const rooms = adForm.querySelector(`select[name="rooms"]`);
  const capacity = adForm.querySelector(`select[name="capacity"]`);
  const timeIn = adForm.querySelector(`select[name="timein"]`);
  const timeOut = adForm.querySelector(`select[name="timeout"]`);
  const type = adForm.querySelector(`select[name="type"]`);
  const price = adForm.querySelector(`#price`);
  const types = {
    'bungalow': { ru: `Бунгало`, min: 0 },
    'flat': { ru: `Квартира`, min: 1000 },
    'house': { ru: `Дом`, min: 5000 },
    'palace': { ru: `Дворец`, min: 10000 }
  };

  const setCoordinates = () => {
    let leftPoint = Math.floor(window.pins.LOCATION_X_MIN - window.pins.Properties.MAIN_WIDTH / 2);
    let rightPoint = Math.floor(window.pins.LOCATION_X_MAX - window.pins.Properties.MAIN_WIDTH / 2);
    let bottomPoint = window.pins.LOCATION_Y_MAX - window.pins.Properties.MAIN_HEIGHT;
    let height;
    let x;
    let y;

    if (window.pins.map.classList.contains(`map--faded`)) {
      height = window.pins.Properties.MAIN_WIDTH / 2;
    } else {
      height = window.pins.Properties.MAIN_HEIGHT;
    };

    if (window.pins.main.offsetLeft <= leftPoint) {
      x = window.pins.LOCATION_X_MIN;
      window.pins.main.style.left = leftPoint + `px`;
    } else if (window.pins.main.offsetLeft >= rightPoint) {
      x = window.pins.LOCATION_X_MAX;
      window.pins.main.style.left = rightPoint + `px`;
    } else {
      x = Math.floor(window.pins.main.offsetLeft + window.pins.Properties.MAIN_WIDTH / 2);
    };

    if (window.pins.main.offsetTop <= window.pins.LOCATION_Y_MIN) {
      y = window.pins.LOCATION_Y_MIN;
      window.pins.main.style.top = window.pins.LOCATION_Y_MIN + `px`;
    } else if (window.pins.main.offsetTop >= bottomPoint) {
      y = window.pins.LOCATION_Y_MAX;
      window.pins.main.style.top = bottomPoint + `px`;
    } else {
      y = Math.floor(window.pins.main.offsetTop + height);
    };

    inputAddress.value = `${x}, ${y}`;
  };

  const toggleForm = (elements, trigger) => {
    elements.forEach((value) => {
      value.disabled = trigger;
    });
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    window.backend.send(onSuccessSubmit, onErrorSubmit, new FormData(adForm));
  };

  const onSuccessSubmit = () => {
    onFormDisabled();
    window.statusMessage.create(`success`);
  };

  const onErrorSubmit = (message) => {
    window.statusMessage.create(`error`, message);
  };

  const onAdsFilter = () => {
    window.popup.close();
    window.pins.remove();
    let filteredPins = window.filter.data(window.pins.data());
    window.pins.render(filteredPins);
  };

  const onFormEnabled = () => {
    adForm.classList.remove(`ad-form--disabled`);
    window.pins.map.classList.remove(`map--faded`);
    toggleForm(formElements, false);
    setCoordinates();
    document.removeEventListener(`keydown`, onKeyPressEnter);
    adForm.addEventListener(`submit`, onFormSubmit);
    filterForm.addEventListener(`change`, window.util.debounce(onAdsFilter));
    btnReset.addEventListener(`click`, onFormDisabled);
  };

  const onFormDisabled = () => {
    adForm.classList.add(`ad-form--disabled`);
    window.pins.map.classList.add(`map--faded`);
    window.pins.remove();
    window.popup.close();
    window.photos.reset();
    toggleForm(formElements, true);
    adForm.reset();
    filterForm.reset();
    window.pins.mainResetPosition();
    setCoordinates();
    document.addEventListener(`keydown`, onKeyPressEnter);
    adForm.removeEventListener(`submit`, onFormSubmit);
    btnReset.removeEventListener(`click`, onFormDisabled);
    filterForm.removeEventListener(`change`, onAdsFilter);
  };

  const onKeyPressEnter = (evt) => {
    if (evt.target.classList.contains(`map__pin--main`)) {
      window.util.isPressEnter(evt, window.pins.create);
    }
  };

  const checkCapacity = () => {
    let roomsValue = parseInt(rooms.value, 10);
    let capacityValue = parseInt(capacity.value, 10);

    if (roomsValue < capacityValue) {
      capacity.setCustomValidity(`Количество гостей может быть не больше количества комнат`);
    } else if (roomsValue === 100 && capacityValue !== 0) {
      capacity.setCustomValidity(`Такое количество комнат не для гостей`);
    } else if (roomsValue !== 100 && capacityValue === 0) {
      capacity.setCustomValidity(`Этот вариант подходит только для 100 комнат`);
    } else {
      capacity.setCustomValidity(``);
    };
  };

  toggleForm(formElements, true);
  setCoordinates();

  document.addEventListener(`keydown`, onKeyPressEnter);

  type.addEventListener(`change`, () => {
    price.min = types[type.value].min;
    price.placeholder = types[type.value].min;
  });

  rooms.addEventListener(`change`, () => {
    checkCapacity();
    capacity.reportValidity();
  });

  capacity.addEventListener(`change`, () => {
    checkCapacity();
    capacity.reportValidity();
  });

  timeIn.addEventListener(`change`, () => {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener(`change`, () => {
    timeIn.value = timeOut.value;
  });

  window.form = {
    ad: adForm,
    types: types,
    setCoordinates: setCoordinates,
    enabled: onFormEnabled,
    disabled: onFormDisabled
  }
