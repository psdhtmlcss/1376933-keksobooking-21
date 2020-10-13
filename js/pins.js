'use strict';
(function () {
  const PinProperties = {
    WIDTH: 50,
    HEIGHT: 70,
    MAIN_WIDTH: 65,
    MAIN_HEIGHT: 87
  };
  const pins = document.querySelector('.map__pins');
  const pinsFragment = document.createDocumentFragment();
  const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  const similarAds = window.data.getAds();

  const createPin = (pinsArray) => {
    let pin = pinTemplate.cloneNode(true);
    let img = pin.querySelector('img');
    pin.style.left = `${pinsArray.location.x - PinProperties.WIDTH / 2}px`;
    pin.style.top = `${pinsArray.location.y - PinProperties.HEIGHT}px`;
    img.src = pinsArray.author.avatar;
    img.alt = pinsArray.offer.title;

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
    createPinsFragment: createPinsFragment
  };
})();
