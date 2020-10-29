'use strict';
(function () {
  const main = document.querySelector('main');

  const createStatusMessage = (selector) => {
    let messageTemplate = document.querySelector(`#${selector}`).content.querySelector(`.${selector}`);
    let fragment = document.createDocumentFragment();
    let messageElement = messageTemplate.cloneNode(true);
    let messageCloseButton = messageElement.querySelector('.error__button');

    fragment.appendChild(messageElement);
    main.appendChild(fragment);

    if (messageCloseButton) {
      messageCloseButton.addEventListener('click', function (evt) {
        evt.preventDefault();
        closeStatusMessage();
      });
    };

    messageElement.addEventListener('click', closeStatusMessage);
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
