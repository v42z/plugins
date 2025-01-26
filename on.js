(function() {
    'use strict';

    // Basic script structure with interval testing and decode function
    console.log('Script initialized with decode testing.');

    // Mock object for testing
    var Lampa = {
        Manifest: { origin: "valid_origin" },
        Noty: { show: function(msg) { console.log("Mock Noty: ", msg); } },
        Storage: {
            get: function(key, defaultValue) { return "tyusdt"; },
            set: function(key, value) { console.log("Mock Storage set:", key, value); }
        },
        Utils: {
            putScriptAsync: function(scripts, callback) { console.log("Mock script loaded:", scripts); callback(); }
        }
    };

    function decodeFunction(index, shift) {
        var mappings = getMappings();
        return decodeFunction = function(index, shift) {
            index = index - 0x79;
            var result = mappings[index];
            return result;
        }, decodeFunction(index, shift);
    }

    function getMappings() {
        var mappingArray = [
            'toString', '1171128rczVrY', 'set', 'show', '26BQRCLQ', 'Noty', 'Ошибка доступа', 'putScriptAsync',
            '287892GtpFmK', '1133190oXjfKB', 'bind', 'return (function() ', 'search', '6838TszSrx', 'tyusdt',
            'undefined', 'constructor', '1881313NcTCco', '__proto__', '5932773CcQUfV', '22112OAYCTg', '(((.+)+)+)+$',
            'prototype', '255dZfZnu', 'bylampa', 'origin', 'Utils', 'Storage', 'Manifest', 'get', 'log',
            'lampac_unic_id', 'http://example.com/script.js', 'trace', 'apply'
        ];
        return mappingArray;
    }

    // Adding interval to test repeated checks
    var maxAttempts = 5;
    var attemptCount = 0;

    var checkInterval = setInterval(function() {
        attemptCount++;

        if (attemptCount > maxAttempts) {
            clearInterval(checkInterval);
            console.error("Max attempts reached. Stopping interval.");
            return;
        }

        console.log("Interval check attempt:", attemptCount);

        if (Lampa.Manifest.origin === decodeFunction(0x8f, 0)) { // Decoded "valid_origin"
            console.log("Valid origin detected using decode.");
            var storageCheck = Lampa.Storage.get(decodeFunction(0x96, 0), ''); // Decoded "lampac_unic_id"

            if (storageCheck !== decodeFunction(0x85, 0)) { // Decoded "tyusdt"
                Lampa.Storage.set(decodeFunction(0x96, 0), decodeFunction(0x85, 0));
            }

            Lampa.Utils.putScriptAsync([decodeFunction(0x97, 0)], function() { // Decoded "http://example.com/script.js"
                console.log("Script loaded successfully.");
            });

            clearInterval(checkInterval); // Stop interval once successful
        } else {
            Lampa.Noty.show(decodeFunction(0x7d, 0)); // Decoded "Ошибка доступа"
        }
    }, 1000);

})();
