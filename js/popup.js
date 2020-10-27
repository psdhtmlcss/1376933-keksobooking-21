'use strict';
(function () {
  const map = document.querySelector('.map');
  const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupImg = popupTemplate.querySelector('.popup__photo');
  const imgFragment = document.createDocumentFragment();

  const fillFeatures = (options, features) => {
    options.forEach(function (option, i) {
      if (features.indexOf(option.classList[1].replace('popup__feature--', '')) < 0) {
        options[i].remove();
      }
    });
  };

  const createPhotos = (array, place) => {
    if (array.length > 0) {
      let img;
      array.forEach(function (value) {
        img = popupImg.cloneNode();
        img.src = value;
        imgFragment.appendChild(img);
      });
      place.appendChild(imgFragment);
    } else {
      place.remove();
    };
  };

  const createPopup = (ad) => {
    popupImg.remove();
    let popup = popupTemplate.cloneNode(true);
    let closeBtn = popup.querySelector('.popup__close');
    let title = popup.querySelector('.popup__title');
    let address = popup.querySelector('.popup__text--address');
    let price = popup.querySelector('.popup__text--price');
    let type = popup.querySelector('.popup__type');
    let capacity = popup.querySelector('.popup__text--capacity');
    let checkInOut = popup.querySelector('.popup__text--time');
    let features = popup.querySelector('.popup__features');
    let options = popup.querySelectorAll('.popup__feature');
    let description = popup.querySelector('.popup__description');
    let photos = popup.querySelector('.popup__photos');
    let avatar = popup.querySelector('.popup__avatar');

    title.textContent = ad.offer.title;
    address.textContent = ad.offer.address;
    price.textContent = `${ad.offer.price}₽/ночь`;
    type.textContent = window.form.types[ad.offer.type].ru;
    capacity.textContent = `${window.util.returnDeclination(ad.offer.rooms, 'комната', 'команаты', 'комнат')} для ${window.util.returnDeclination(ad.offer.guests, 'гостя', 'гостей', 'гостей')}`;
    checkInOut.textContent = `Заезд после ${ad.offer.checkin} выезд до ${ad.offer.checkout}`;
    ad.offer.description.length !== 0 ? description.textContent = ad.offer.description : description.remove();
    ad.author.avatar.length !== 0 ? avatar.src = ad.author.avatar : avatar.remove();
    ad.offer.features.length > 0 ? fillFeatures(options, ad.offer.features) : features.remove();
    createPhotos(ad.offer.photos, photos);
    window.pins.wrapper.after(popup);

    document.addEventListener('keydown', onKeyPressEscape);
    closeBtn.addEventListener('click', closePopup);

    return popup;

  };

  const closePopup = () => {
    let card = map.querySelector('.popup');
    window.pins.removeActiveClass();
    if (card) {
      card.remove();
      document.removeEventListener('keydown', onKeyPressEscape);
    }
  };

  const onKeyPressEscape = (evt) => {
    window.util.isPressEscape(evt, closePopup);
  };

  window.popup = {
    create: createPopup,
    close: closePopup
  };

})();
