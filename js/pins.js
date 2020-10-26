'use strict';
(function () {
  const MAX_COUNT = 5;
  const TIMEOUT_IN_MS = 3000;
  const LOCATION_X_MIN = 0;
  const LOCATION_X_MAX = 1200;
  const LOCATION_Y_MIN = 130;
  const LOCATION_Y_MAX = 630;
  const PinProperties = {
    WIDTH: 50,
    HEIGHT: 70,
    MAIN_WIDTH: 65,
    MAIN_HEIGHT: 87,
    MAIN_START_POSITION_TOP: 375,
    MAIN_START_POSITION_LEFT: 570
  };

  const map = document.querySelector('.map');
  const pinsWrap = document.querySelector('.map__pins');
  const pinMain = pinsWrap.querySelector('.map__pin--main');
  const pinsFragment = document.createDocumentFragment();
  const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  const mainPinResetPosition = () => {
    pinMain.style.top = PinProperties.MAIN_START_POSITION_TOP + 'px';
    pinMain.style.left = PinProperties.MAIN_START_POSITION_LEFT + 'px';
  };

  const setActiveClass = (pin) => {
    removeActiveClass();
    pin.classList.add('map__pin--active');
  };

  const removeActiveClass = () => {
    let activePin = map.querySelector('.map__pin--active');

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    };
  };

  const createPin = (pinArray) => {
    let pin = pinTemplate.cloneNode(true);
    let img = pin.querySelector('img');

    pin.style.left = `${pinArray.location.x - PinProperties.WIDTH / 2}px`;
    pin.style.top = `${pinArray.location.y - PinProperties.HEIGHT}px`;
    img.src = pinArray.author.avatar;
    img.alt = pinArray.offer.title;

    pin.addEventListener('click', function (evt) {
      if (evt.key === window.util.Keys.ENTER_KEY || evt.button === window.util.Mouse.LEFT_KEY_BUTTON) {
        window.popup.close();
        setActiveClass(pin);
        window.popup.create(pinArray);
      };
    });

    return pin;
  };

  const removePins = () => {
    let mapPin = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    if (mapPin.length > 0) {
      mapPin.forEach(function (item) {
        item.remove();
      });
    };
  };

  const successHandler = (similarAds) => {
    let calculateMaxCount = (maxCount) => {
      if (similarAds.length > MAX_COUNT) {
        maxCount = MAX_COUNT;
      } else {
        maxCount = similarAds.length;
      };

      return maxCount;
    };

    let maxCount = calculateMaxCount();

    for (let i = 0; i < maxCount; i++) {
      pinsFragment.appendChild(createPin(similarAds[i]));
    };

    pinsWrap.appendChild(pinsFragment);
  };

  const errorHandler = (errorMessage) => {
    let node = document.createElement('div');
    let removeNode = () => {
      node.remove();
    };
    node.style = 'position: fixed; left: 0; top: 0; z-index: 100; width: 100%;  margin: 0 auto; padding: 10px; text-align: center; color: white; background-color: #ff5635;';
    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);

    setTimeout(removeNode, TIMEOUT_IN_MS);
  };

  const createPinsFragment = () => {
    window.load(successHandler, errorHandler, null, null);
  };

  window.pins = {
    LOCATION_X_MIN: LOCATION_X_MIN,
    LOCATION_X_MAX: LOCATION_X_MAX,
    LOCATION_Y_MIN: LOCATION_Y_MIN,
    LOCATION_Y_MAX: LOCATION_Y_MAX,
    Properties: PinProperties,
    wrap: pinsWrap,
    main: pinMain,
    map: map,
    create: createPinsFragment,
    remove: removePins,
    mainResetPosition: mainPinResetPosition,
    removeActiveClass: removeActiveClass
  };
})();
