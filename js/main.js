'use strict';
(function () {
  const mapFiltersElements = document.querySelectorAll('.map__filter');
  const adFormElements = document.querySelectorAll('.ad-form__element');

  window.form.disabledForm(mapFiltersElements, true);
  window.form.disabledForm(adFormElements, true);
  window.form.getInitialCoordinates();
})();





