'use strict';
(function () {
  const main = document.querySelector('main');

  const createStatusMessage = (selector) => {
    let template = document.querySelector(`#${selector}`).content.querySelector(`.${selector}`);
    let fragment = document.createDocumentFragment();
    let message = template.cloneNode(true);
    let btn = message.querySelector('.error__button');

    fragment.appendChild(message);
    main.appendChild(fragment);

    if (btn) {
      btn.addEventListener('click', function (evt) {
        evt.preventDefault();
        closeStatusMessage();
      });
    };

    message.addEventListener('click', closeStatusMessage);
    document.addEventListener('keydown', onKeyPressEscape);
  };

  const closeStatusMessage = () => {
    let successMessage = main.querySelector('.success');
    let errorMessage = main.querySelector('.error');
    if (successMessage) { successMessage.remove(); };
    if (errorMessage) { errorMessage.remove(); };
    document.removeEventListener('keydown', onKeyPressEscape);
  };

  const onKeyPressEscape = (evt) => {
    window.util.isPressEscape(evt, closeStatusMessage);
  };

  window.statusMessage = {
    create: createStatusMessage,
    close: closeStatusMessage
  };
})();
