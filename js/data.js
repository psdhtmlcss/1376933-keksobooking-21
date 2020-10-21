'use strict';
(function () {
  const MAX_COUNT = 8;
  const MAX_PHOTO = 3
  const map = document.querySelector('.map');
  const LOCATION_X_MIN = 0;
  const LOCATION_X_MAX = 1200;
  const LOCATION_Y_MIN = 130;
  const LOCATION_Y_MAX = 630;
  const similarAds = [];
  const types = ['palace', 'flat', 'house', 'bungalow'];
  const checkInOut = ['12:00', '13:00', '14:00'];
  const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  const getPhotos = () => {
    let photos = [];
    for (let i = 0; i < MAX_PHOTO; i++) {
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
            'address': `${window.util.getRandom(1, LOCATION_X_MAX)}, ${1, LOCATION_X_MAX}`,
            'price': 0,
            'type': `${types[window.util.getRandom(0, types.length - 1)]}`,
            'rooms': 3,
            'guests': 2,
            'checkin': `${checkInOut[window.util.getRandom(0, checkInOut.length - 1)]}`,
            'checkout': `${checkInOut[window.util.getRandom(0, checkInOut.length - 1)]}`,
            'features': window.util.shaffleArray(features).slice(0, window.util.getRandom(0, features.length)),
            'description': `Описание ${i + 1}`,
            'photos': window.util.shaffleArray(photos).slice(0, window.util.getRandom(0, photos.length))
          },
          'location': {
            'x': window.util.getRandom(1, map.offsetWidth),
            'y': window.util.getRandom(LOCATION_Y_MIN, LOCATION_Y_MAX)
          }
        }
      );
    };
    return similarAds;
  };

  window.data = {
    MAX_COUNT: MAX_COUNT,
    LOCATION_X_MIN: LOCATION_X_MIN,
    LOCATION_X_MAX: LOCATION_X_MAX,
    LOCATION_Y_MIN: LOCATION_Y_MIN,
    LOCATION_Y_MAX: LOCATION_Y_MAX,
    map: map,
    getAds: getAds
  };
})();
