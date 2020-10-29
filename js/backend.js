'use strict';
(function () {
  const TIMEOUT_IN_MS = 10000;
  const BackendURLs = {
    GET: 'https://21.javascript.pages.academy/keksobooking/data',
    SEND: 'https://21.javascript.pages.academy/keksobooking'
  };
  const StatusCode = {
    OK: 200
  };

  const createXHR = (method, url, onSuccess, onError) => {
    let xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);
    return xhr;
  };

  const getData = (onSuccess, onError) => {
    createXHR('GET', BackendURLs.GET, onSuccess, onError).send();
  };

  const sendData = (onSuccess, onError, data) => {
    createXHR('POST', BackendURLs.SEND, onSuccess, onError).send(data);
  };

  window.backend = {
    get: getData,
    send: sendData
  }
})();
