(function() {
    'use strict';

    // Basic script structure with interval testing
    console.log('Script initialized with interval testing.');

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

        if (Lampa.Manifest.origin === "valid_origin") {
            console.log("Valid origin detected.");
            var storageCheck = Lampa.Storage.get("lampac_unic_id", '');

            if (storageCheck !== 'tyusdt') {
                Lampa.Storage.set("lampac_unic_id", "tyusdt");
            }

            Lampa.Utils.putScriptAsync(["http://example.com/script.js"], function() {
                console.log("Script loaded successfully.");
            });

            clearInterval(checkInterval); // Stop interval once successful
        } else {
            Lampa.Noty.show("Ошибка доступа");
        }
    }, 1000);

})();
