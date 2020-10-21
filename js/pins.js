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
  const pinsFragment = document.createDocumentFragment();
  const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  const similarAds = window.data.getAds();

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

  const createPinsFragment = () => {
    for (let i = 0; i < window.data.MAX_COUNT; i++) {
      pinsFragment.appendChild(createPin(similarAds[i]));
    };

    pins.appendChild(pinsFragment);
  };

  window.pins = {
    PinProperties: PinProperties,
    pins: pins,
    similarAds: similarAds,
    createPinsFragment: createPinsFragment,
    removeActiveClass: removeActiveClass
  };
})();
