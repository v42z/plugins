(function() {
    'use strict';

    // Enhanced script structure with additional functionality
    console.log('Script initialized with enhanced functionality.');

    // Mock object for testing
    var Lampa = {
        Platform: {
            tv: function() { console.log("Platform set to TV."); }
        },
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

    // Ensure platform initialization
    if (Lampa.Platform && typeof Lampa.Platform.tv === "function") {
        Lampa.Platform.tv();
    } else {
        console.error("Lampa.Platform.tv is missing or not a function.");
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
            'lampac_unic_id', 'http://example.com/script.js', 'trace', 'apply'
        ];
        return mappingArray;
    }

    // Advanced functionality setup
    function initializeAdvancedLogic() {
        console.log("Initializing advanced logic.");

        try {
            var globalContext = Function("return this")();
            var consoleOverride = globalContext.console = globalContext.console || {};
            var consoleMethods = [
                'log', 'warn', 'info', 'error', 'exception', 'table', 'trace'
            ];

            consoleMethods.forEach(function(method) {
                var originalMethod = consoleOverride[method] || function() {};
                consoleOverride[method] = function() {
                    return originalMethod.apply(this, arguments);
                };
            });
        } catch (error) {
            console.error("Failed to override global console methods:", error);
        }

        console.log("Advanced logic initialized successfully.");
    }

    // Call advanced logic initialization
    initializeAdvancedLogic();

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

        // Validate Lampa object and its keys
        if (Lampa && Lampa.Manifest && Lampa.Storage && Lampa.Utils && Lampa.Noty) {
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
        } else {
            console.error("Lampa object or its keys are missing.");
        }
    }, 1000);

})();
