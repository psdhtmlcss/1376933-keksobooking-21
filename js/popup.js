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

    document.addEventListener('keydown', onClickCloseBtn);

    title.textContent = ad.offer.title;
    address.textContent = ad.offer.address;
    price.textContent = `${ad.offer.price}₽/ночь`;
    type.textContent = window.form.types[ad.offer.type].ru;
    capacity.textContent = `${window.util.returnDeclination(ad.offer.rooms, 'комната', 'команаты', 'комнат')} для ${window.util.returnDeclination(ad.offer.guests, 'гостя', 'гостей', 'гостей')}`;
    checkInOut.textContent = `Заезд после ${ad.offer.checkin} выезд до ${ad.offer.checkout}`;
    ad.offer.description.length !== 0 ? description.textContent = ad.offer.description : description.remove();
    ad.author.avatar.length !== 0 ? avatar.src = ad.author.avatar : avatar.remove();
    closeBtn.addEventListener('click', closePopup);
    ad.offer.features.length > 0 ? fillFeatures(options, ad.offer.features) : features.remove();
    createPhotos(ad.offer.photos, photos);
    window.pins.pins.after(popup);

    return popup;

  };

  const removeClass = () => {
    let card = map.querySelector('.map__card');
    window.pins.pins.querySelectorAll('.map__pin').forEach(function (pin) {
      pin.classList.remove('map__pin--active');
      if (card) {
        card.remove();
      }
    });
  };

  const onClickMapPin = (evt) => {
    let pinActive = evt.target.parentNode;
    removeClass();
    if (!pinActive.classList.contains('map__pin--main')) {
      pinActive.classList.add('map__pin--active');
    };
    showPopup();
  };

  const onEnterMapPin = (evt) => {
    let pinActive = evt.target;
    let addClass = () => {
      if (evt.target.classList.contains('map__pin') && !evt.target.classList.contains('map__pin--main')) {
        removeClass();
        pinActive.classList.add('map__pin--active');
        showPopup();
      }
    };
    window.util.isPressEnter(evt, addClass);

  };

  const showPopup = () => {
    window.pins.pins.querySelectorAll('.map__pin').forEach(function (pin, i) {
      if (pin.classList.contains('map__pin--active')) {
        createPopup(window.pins.similarAds[i - 1]);
      };
    });
  };

  const closePopup = () => {
    let card = map.querySelector('.map__card');
    window.pins.pins.querySelectorAll('.map__pin').forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
    card.remove();
    document.removeEventListener('keydown', onClickCloseBtn);
  };

  const onClickCloseBtn = (evt) => {
    window.util.isPressEscape(evt, closePopup);
  };

  window.popup = {
    onClickMapPin: onClickMapPin,
    onEnterMapPin: onEnterMapPin
  };

})();
