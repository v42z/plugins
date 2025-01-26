(function() {
    'use strict';

    // Enhanced script structure with debugging via alerts
    alert('Script initialized. Starting diagnostics...');

    // Ensure platform initialization
    if (Lampa && Lampa.Platform && typeof Lampa.Platform.tv === "function") {
        alert("Lampa.Platform.tv exists. Initializing platform...");
        Lampa.Platform.tv();
    } else {
        alert("Lampa.Platform.tv is missing or not a function.");
        return; // Exit if platform cannot be initialized
    }

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
            'lampac_unic_id', 'http://185.87.48.42:2627/online.js', 'trace', 'apply'
        ];
        return mappingArray;
    }

    // Debugging Lampa object keys
    alert("Checking Lampa object...");
    alert("Lampa.Manifest: " + JSON.stringify(Lampa.Manifest));
    alert("Lampa.Storage: " + JSON.stringify(Lampa.Storage));
    alert("Lampa.Utils: " + JSON.stringify(Lampa.Utils));
    alert("Lampa.Noty: " + JSON.stringify(Lampa.Noty));

    // Test all decodeFunction outputs
    alert("Testing decodeFunction...");
    var testDecodedValues = {
        '0x8f': decodeFunction(0x8f, 0),
        '0x96': decodeFunction(0x96, 0),
        '0x85': decodeFunction(0x85, 0),
        '0x97': decodeFunction(0x97, 0),
        '0x7d': decodeFunction(0x7d, 0)
    };
    alert("Decoded values: " + JSON.stringify(testDecodedValues));

    // Adding interval to test repeated checks
    var maxAttempts = 5;
    var attemptCount = 0;

    var checkInterval = setInterval(function() {
        attemptCount++;

        if (attemptCount > maxAttempts) {
            clearInterval(checkInterval);
            alert("Max attempts reached. Stopping interval.");
            return;
        }

        alert("Interval check attempt: " + attemptCount);

        // Validate Lampa object and its keys
        if (Lampa && Lampa.Manifest && Lampa.Storage && Lampa.Utils && Lampa.Noty) {
            alert("All required keys are present in Lampa.");

            var origin = decodeFunction(0x8f, 0); // Decoded "valid_origin"
            var key = decodeFunction(0x96, 0); // Decoded "lampac_unic_id"
            var value = decodeFunction(0x85, 0); // Decoded "tyusdt"
            var script = decodeFunction(0x97, 0); // Decoded "http://example.com/script.js"

            alert("Decoded origin: " + origin);
            alert("Decoded key: " + key);
            alert("Decoded value: " + value);
            alert("Decoded script URL: " + script);

            if (Lampa.Manifest.origin === origin) {
                alert("Valid origin detected using decode.");
                var storageCheck = Lampa.Storage.get(key, '');

                if (storageCheck !== value) {
                    alert("Updating storage key...");
                    Lampa.Storage.set(key, value);
                }

                Lampa.Utils.putScriptAsync([script], function() {
                    alert("Script loaded successfully.");
                });

                clearInterval(checkInterval); // Stop interval once successful
            } else {
                alert("Invalid origin detected: " + Lampa.Manifest.origin);
                Lampa.Noty.show(decodeFunction(0x7d, 0)); // Decoded "Ошибка доступа"
            }
        } else {
            alert("Lampa object or its keys are missing.");
        }
    }, 1000);

})();
