'use strict';
(function () {
  const MAX_COUNT = 8;
  const pinsFragment = document.createDocumentFragment();
  const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  const pins = document.querySelector('.map__pins');
  const PinProperties = {
    WIDTH: 50,
    HEIGHT: 70,
    MAIN_WIDTH: 65,
    MAIN_HEIGHT: 87
  };
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

  window.pins = {
    createPinsFragment: function () {
      for (let i = 0; i < MAX_COUNT; i++) {
        pinsFragment.appendChild(createPin(similarAds[i]));
      };

      pins.appendChild(pinsFragment);
    }
  }
})();
