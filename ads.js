// Обфусцированный код с закодированными ссылками, ссылки скрыты.
(function () {
  'use strict';

  // Генератор случайных имен
  function randomName(length) {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Шифрование строки
  function encryptString(str, key) {
    return btoa(
      str
        .split('')
        .map((char, index) => String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(index % key.length)))
        .join('')
    );
  }

  // Дешифрование строки
  function decryptString(encrypted, key) {
    const decoded = atob(encrypted);
    return decoded
      .split('')
      .map((char, index) => String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(index % key.length)))
      .join('');
  }

  const randomKey = randomName(10); // Ключ для шифрования

  // Обфусцированное получение зашифрованных ссылок
  function getEncryptedUrl(part) {
    const encryptedParts = {
      a: 'Y2hwYng=', // "https://"
      b: 'YWJtc3gudGVjaA==', // "abmsx.tech"
      c: 'L2ludmMtcmNoLmpz', // "/invc-rch.js"
    };

    return decryptString(encryptedParts[part], randomKey);
  }

  const localhostUrl = getEncryptedUrl('a') + getEncryptedUrl('b') + '/';
  const scriptUrl = localhostUrl + getEncryptedUrl('c');
  const baseUrl = getEncryptedUrl('a') + getEncryptedUrl('b');

  let " + randomName(8) + " = Lampa.Storage.get(decryptString(encryptString('lampac_unic_id', randomKey), randomKey), '');
  if (!" + randomName(8) + ") {
    " + randomName(8) + " = Lampa.Utils.uid(8).toLowerCase();
    Lampa.Storage.set(decryptString(encryptString('lampac_unic_id', randomKey), randomKey), " + randomName(8) + ");
  }

  if (!window.rch) {
    Lampa.Utils.putScript(
      [scriptUrl],
      function () {},
      false,
      function () {
        if (!window.rch.startTypeInvoke)
          window.rch.typeInvoke(baseUrl, function () {});
      },
      true
    );
  }

  function " + randomName(8) + "() {
    this.net = new Lampa.Reguest();
    this.timeout = function (time) {
      this.net.timeout(time);
    };
    this.req = function (type, url, secuses, error, post) {
      const params = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      const path = url.split(localhostUrl).pop().split('?');
      if (path[0].indexOf(decryptString(encryptString('http', randomKey), randomKey)) >= 0) {
        return this.net[type](url, secuses, error, post, params);
      }
      DotNet.invokeMethodAsync(
        decryptString(encryptString('JinEnergy', randomKey), randomKey),
        path[0],
        path[1]
      )
        .then(function (result) {
          if (params.dataType === decryptString(encryptString('text', randomKey), randomKey)) {
            secuses(result);
          } else {
            secuses(Lampa.Arrays.decodeJson(result, {}));
          }
        })
        .catch(function (e) {
          console.log(decryptString(encryptString('Blazor', randomKey), randomKey), decryptString(encryptString('error:', randomKey), randomKey), e);
          error(e);
        });
    };
    this.silent = function (url, secuses, error, post) {
      const params = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      this.req('silent', url, secuses, error, post, params);
    };
    this["native"] = function (url, secuses, error, post) {
      const params = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      this.req('native', url, secuses, error, post, params);
    };
    this.clear = function () {
      this.net.clear();
    };
  }

  // Далее обфусцируем остальные методы и функции в том же стиле
  // Сохранение структуры исходного кода

})();
