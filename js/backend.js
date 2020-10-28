'use strict';
(function () {
  const GET_URL = 'https://21.javascript.pages.academy/keksobooking/data';
  const SEND_URL = 'https://21.javascript.pages.academy/keksobooking';
  const TIMEOUT_IN_MS = 10000;
  const StatusCode = {
    OK: 200
  };

  const getData = (onSuccess, onError) => {
    let xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        window.form.enabled();
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      };

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('GET', GET_URL);
      xhr.send();
    });
  };

  const sendData = (data, createMessage) => {
    let xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    if (xhr.status === StatusCode.OK) {
      createMessage('success');
      window.form.disabled();
    } else {
      createMessage('error');
    };

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('POST', SEND_URL);
    xhr.send(data);

  };

  window.backend = {
    get: getData,
    send: sendData
  }
})();
