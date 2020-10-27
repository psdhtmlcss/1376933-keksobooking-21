'use strict';
(function () {
  const GET_URL = 'https://21.javascript.pages.academy/keksobooking/data';
  const SEND_URL = 'https://21.javascript.pages.academy/keksobooking';
  const TIMEOUT_IN_MS = 10000;
  const StatusCode = {
    OK: 200
  };

  window.load = (onSuccess, onError, data, createMessage) => {
    let xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        if (data) {
          createMessage('success');
          window.form.disabled();
        } else {
          onSuccess(xhr.response);
          window.form.enabled();
        };

      } else {
        if (data) {
          createMessage('error');
        } else {
          onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
        }
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    if (data) {
      xhr.open('POST', SEND_URL);
      xhr.send(data);
    } else {
      xhr.open('GET', GET_URL);
      xhr.send();
    }

  };
})();
