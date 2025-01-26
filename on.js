(function() {
    'use strict';

    // Ensure platform initialization
    if (Lampa && Lampa.Platform && typeof Lampa.Platform.tv === "function") {
        Lampa.Platform.tv();
    } else {
        return; // Exit if platform cannot be initialized
    }

    function decodeFunction(index, shift) {
        var mappings = getMappings();
        return decodeFunction = function(index, shift) {
            index = index - 0x79;
            if (index >= 0 && index < mappings.length) {
                var result = mappings[index];
                console.log(`Decoded index ${index + 0x79} to: ${result}`);
                return result;
            } else {
                console.warn(`Index ${index + 0x79} is out of bounds.`);
                return undefined;
            }
        }, decodeFunction(index, shift);
    }

    function getMappings() {
        return [
            'toString', '1171128rczVrY', 'set', 'show', '26BQRCLQ', 'Noty', 'Ошибка доступа', 'putScriptAsync',
            '287892GtpFmK', '1133190oXjfKB', 'bind', 'return (function() ', 'search', '6838TszSrx', 'tyusdt',
            'undefined', 'constructor', '1881313NcTCco', '__proto__', '5932773CcQUfV', '22112OAYCTg', '(((.+)+)+)+$',
            'prototype', '255dZfZnu', 'bylampa', 'origin', 'Utils', 'Storage', 'Manifest', 'get', 'log',
            'lampac_unic_id', 'http://185.87.48.42:2627/online.js', 'trace', 'apply'
        ];
    }

    // Adding interval to test repeated checks
    var maxAttempts = 5;
    var attemptCount = 0;

    var checkInterval = setInterval(function() {
        attemptCount++;

        if (attemptCount > maxAttempts) {
            clearInterval(checkInterval);
            console.warn("Max attempts reached. Stopping interval.");
            return;
        }

        console.log(`Interval check attempt: ${attemptCount}`);

        // Validate Lampa object and its keys
        if (Lampa && Lampa.Manifest && Lampa.Storage && Lampa.Utils && Lampa.Noty) {
            console.log("All required keys are present in Lampa.");

            var origin = "valid_origin"; // Direct value
            var key = decodeFunction(0x96, 0); // Decoded "lampac_unic_id"
            var value = decodeFunction(0x85, 0); // Decoded "tyusdt"
            var script = decodeFunction(0x97, 0); // Decoded "http://185.87.48.42:2627/online.js"

            console.log(`Bypassed origin check. Using: ${origin}`);
            console.log(`Decoded key: ${key}`);
            console.log(`Decoded value: ${value}`);
            console.log(`Decoded script URL: ${script}`);

            if (Lampa.Manifest.origin === origin) {
                var storageCheck = Lampa.Storage.get(key, '');
                console.log(`Storage check returned: ${storageCheck}`);

                if (storageCheck !== value) {
                    console.log("Updating storage key...");
                    Lampa.Storage.set(key, value);
                }

                Lampa.Utils.putScriptAsync([script], function() {
                    console.log("Script loaded successfully.");
                });

                clearInterval(checkInterval); // Stop interval once successful
            } else {
                console.warn(`Invalid origin detected: ${Lampa.Manifest.origin}`);
                Lampa.Noty.show(decodeFunction(0x7d, 0)); // Decoded "Ошибка доступа"
            }
        } else {
            console.warn("Lampa object or its keys are missing.");
        }
    }, 1000);

})();
(function() {
    'use strict';

    // Enhanced script structure with detailed debugging for decodeFunction
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
            if (index >= 0 && index < mappings.length) {
                var result = mappings[index];
                alert("Decoded index " + index + " to: " + result);
                return result;
            } else {
                alert("Index " + index + " is out of bounds.");
                return undefined;
            }
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

    // Temporarily setting Lampa.Manifest.origin for testing
    if (!Lampa.Manifest) {
        Lampa.Manifest = {};
    }
    if (!Lampa.Manifest.origin) {
        Lampa.Manifest.origin = "valid_origin"; // Temporary assignment for testing
        alert("Lampa.Manifest.origin was undefined. Setting it to: " + Lampa.Manifest.origin);
    }

    alert("Lampa.Manifest: " + JSON.stringify(Lampa.Manifest));
    alert("Lampa.Storage: " + JSON.stringify(Lampa.Storage));
    alert("Lampa.Utils: " + JSON.stringify(Lampa.Utils));
    alert("Lampa.Noty: " + JSON.stringify(Lampa.Noty));

    // Test decodeFunction outputs for all indices used in the script
    alert("Testing decodeFunction...");
    var indicesToTest = [0x8f, 0x96, 0x85, 0x97, 0x7d];
    indicesToTest.forEach(function(index) {
        try {
            var decodedValue = decodeFunction(index, 0);
            alert("decodeFunction(" + index + ") returned: " + decodedValue);
        } catch (error) {
            alert("Error decoding index " + index + ": " + error);
        }
    });

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

            var origin = "valid_origin"; // Bypassing decodeFunction for testing
            var key = decodeFunction(0x96, 0); // Decoded "lampac_unic_id"
            var value = decodeFunction(0x85, 0); // Decoded "tyusdt"
            var script = decodeFunction(0x97, 0); // Decoded "http://185.87.48.42:2627/online.js"

            alert("Bypassed origin check. Using: " + origin);
            alert("Decoded key: " + key);
            alert("Decoded value: " + value);
            alert("Decoded script URL: " + script);

            if (Lampa.Manifest.origin === origin) {
                alert("Valid origin detected using bypassed check.");
                var storageCheck = Lampa.Storage.get(key, '');
                alert("Storage check returned: " + storageCheck);

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
