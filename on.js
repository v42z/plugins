(function() {
    'use strict';

    // Basic script structure without unnecessary checks and intervals
    console.log('Script initialized. Minimal structure for debugging.');

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

    // Basic test to verify script runs
    if (Lampa.Manifest.origin === "valid_origin") {
        console.log("Valid origin detected.");
        var storageCheck = Lampa.Storage.get("lampac_unic_id", '');

        if (storageCheck !== 'tyusdt') {
            Lampa.Storage.set("lampac_unic_id", "tyusdt");
        }

        Lampa.Utils.putScriptAsync(["http://example.com/script.js"], function() {
            console.log("Script loaded successfully.");
        });
    } else {
        Lampa.Noty.show("Ошибка доступа");
    }

})();
