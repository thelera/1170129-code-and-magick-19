'use strict';

(function () {
  var status = {
    OK: {code: 200},
    BAD_REQUEST: {code: 400, errorMessage: 'Неверный запрос'},
    UNAUTHORIZED: {code: 401, errorMessage: 'Пользователь не авторизован'},
    NOT_FOUND: {code: 404, errorMessage: 'Ничего не найдено'},
    DEFAULT: {errorMessage: 'Статус ответа: '}
  };
  var TIMEOUT = 10000;// 10 sec
  var URL_LOAD = 'https://js.dump.academy/code-and-magick/data';
  var URL_UPLOAD = 'https://js.dump.academy/code-and-magick/';
  var GET_METHOD = 'GET';
  var POST_METHOD = 'POST';

  var createRequest = function (successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;

      switch (xhr.status) {
        case status.OK.code:
          successHandler(xhr.response);
          break;
        case status.BAD_REQUEST.code:
          error = status.BAD_REQUEST.errorMessage;
          break;
        case status.UNAUTHORIZED.code:
          error = status.UNAUTHORIZED.errorMessage;
          break;
        case status.NOT_FOUND.code:
          error = status.NOT_FOUND.errorMessage;
          break;
        default:
          error = status.DEFAULT.errorMessage + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        errorHandler(error);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  };

  window.backend = {
    load: function (successHandler, errorHandler) {
      var xhr = createRequest(successHandler, errorHandler);

      xhr.open(GET_METHOD, URL_LOAD);
      xhr.send();
    },

    save: function (data, successHandler, errorHandler) {
      var xhr = createRequest(successHandler, errorHandler);

      xhr.open(POST_METHOD, URL_UPLOAD);
      xhr.send(data);
    }
  };
})();
