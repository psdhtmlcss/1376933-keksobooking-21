'use strict';
(function () {
  const MAX_COUNT = 5;
  const LOCATION_X_MIN = 0;
  const LOCATION_X_MAX = 1200;
  const LOCATION_Y_MIN = 130;
  const LOCATION_Y_MAX = 630;
  const PinProperties = {
    WIDTH: 50,
    HEIGHT: 70,
    MAIN_WIDTH: 65,
    MAIN_HEIGHT: 87
  };

  const map = document.querySelector('.map');
  const pins = document.querySelector('.map__pins');
  const pinsFragment = document.createDocumentFragment();
  const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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

    pins.appendChild(pinsFragment);
  };

  const errorHandler = (errorMessage) => {
    let node = document.createElement('div');
    let removeNode = () => {
      node.remove();
    };
    node.style = 'position: fixed; left: 0; top: 0; z-index: 100; width: 100%;  margin: 0 auto; padding: 10px; text-align: center; color: white; background-color: #ff5635;';
    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);

    setTimeout(removeNode, 3000);
  };

  const createPinsFragment = () => {
    window.load(successHandler, errorHandler);
  };

  window.pins = {
    LOCATION_X_MIN: LOCATION_X_MIN,
    LOCATION_X_MAX: LOCATION_X_MAX,
    LOCATION_Y_MIN: LOCATION_Y_MIN,
    LOCATION_Y_MAX: LOCATION_Y_MAX,
    PinProperties: PinProperties,
    pins: pins,
    map: map,
    createPinsFragment: createPinsFragment,
    createPinsFragment: createPinsFragment,
    removeActiveClass: removeActiveClass
  };
})();
