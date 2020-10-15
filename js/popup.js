'use strict';
(function () {
  const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupFeatures = popupTemplate.querySelector('.popup__features');
  const popupPhotos = popupTemplate.querySelector('.popup__photos');
  const popupPhotosFragment = document.createDocumentFragment();
  const popupsFragment = document.createDocumentFragment();
  const mapFilterContainer = window.data.map.querySelector('.map__filters-container');
  const firstAd = window.pins.similarAds[0];

  const types = {
    'house': 'Дом',
    'flat': 'Квартира',
    'bungalow': 'Бунгало',
    'palace': 'Дворец'
  };

  // Добавляем удобства
  const fillFeatures = () => {
    let elements = popupFeatures.querySelectorAll('.popup__feature');
    if (firstAd.offer.features.length !== 0) {
      for (let i = 0; i < firstAd.offer.features.length; i++) {
        let li = document.createElement('li');
        li.className = `popup__feature popup__feature--${firstAd.offer.features[i]}`;
        popupFeatures.appendChild(li);
      };

      for (let i = 0; i < elements.length; i++) {
        if (elements[i].textContent.length === 0) {
          elements[i].remove();
        }
      };
    } else {
      popupFeatures.style.display = 'none';
    }
  };

  fillFeatures();

  // Добавляем фото
  const createPhotos = (photosArray) => {
    let img = popupPhotos.querySelector('.popup__photo').cloneNode();
    img.src = photosArray;

    return img;
  };

  const createPopupsPhotosFragment = () => {
    if (firstAd.offer.photos.length !== 0) {
      for (let i = 0; i < firstAd.offer.photos.length; i++) {
        popupPhotosFragment.appendChild(createPhotos(firstAd.offer.photos[i]));
      };

      popupPhotos.appendChild(popupPhotosFragment);
      popupPhotos.querySelector('.popup__photo:first-child').remove();
    } else {
      popupPhotos.style.display = 'none';
    }

  };

  createPopupsPhotosFragment();

  const createPopup = (popupsArray) => {
    let popup = popupTemplate.cloneNode(true);
    let title = popup.querySelector('.popup__title');
    let address = popup.querySelector('.popup__text--address');
    let price = popup.querySelector('.popup__text--price');
    let type = popup.querySelector('.popup__type');
    let capacity = popup.querySelector('.popup__text--capacity');
    let checkInOut = popup.querySelector('.popup__text--time');
    let description = popup.querySelector('.popup__description');
    let avatar = popup.querySelector('.popup__avatar');

    title.textContent = popupsArray.offer.title;
    address.textContent = popupsArray.offer.address;
    price.textContent = `${popupsArray.offer.price}₽/ночь`;
    type.textContent = types[firstAd.offer.type];
    capacity.textContent = `${window.util.returnDeclination(popupsArray.offer.rooms, 'комната', 'команаты', 'комнат')} для ${window.util.returnDeclination(popupsArray.offer.guests, 'гостя', 'гостей', 'гостей')}`;
    checkInOut.textContent = `Заезд после ${popupsArray.offer.checkin} выезд до ${popupsArray.offer.checkout}`;
    popupsArray.offer.description.length !== 0 ? description.textContent = popupsArray.offer.description : description.style.display = 'none';
    popupsArray.author.avatar.length !== 0 ? avatar.src = popupsArray.author.avatar : avatar.style.display = 'none';

    return popup;
  };

  const createPopupsFragment = () => {
    popupsFragment.appendChild(createPopup(firstAd));
    mapFilterContainer.prepend(popupsFragment);
  };

  createPopupsFragment();

})();
