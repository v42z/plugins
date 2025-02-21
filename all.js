(function() {
    'use strict';

    // Проверка доступности Lampa.Storage
    if (typeof Lampa.Storage === 'undefined') {
        console.error('Lampa.Storage is not defined');
        return;
    } else {
        console.log('Lampa.Storage is available');
    }

    // Проверка доступности $.getScript
    if (typeof $ === 'undefined' || typeof $.getScript !== 'function') {
        console.error('$.getScript is not defined');
        return;
    } else {
        console.log('$.getScript is available');
    }

    var updateplugins = false;
    var plugins = Lampa.Storage.get('plugins', '[]');

    // Преобразуем строку в массив, если это необходимо
    if (typeof plugins === 'string') {
        try {
            plugins = JSON.parse(plugins);
        } catch (e) {
            console.error('Failed to parse plugins array:', e);
            plugins = [];
        }
    }

    plugins.forEach(function(plug) {
        if (plug.url && plug.url.indexOf('plugins/all') >= 0) {
            updateplugins = true;
            plug.url = (plug.url + '').replace('http://v42z.github.io/plugins/all.js', 'http://v42z.github.io/plugins/addon.js', 'http://v42z.github.io/plugins/on.js');
            plug.url = (plug.url + '').replace('http://v42z.github.io/plugins/all.js', 'http://v42z.github.io/plugins/addon.js', 'http://v42z.github.io/plugins/on.js');
        }

        if (plug.url && plug.url.indexOf('plugins/all') >= 0) {
            updateplugins = true;
            plug.url = (plug.url + '').replace('http://v42z.github.io/plugins/all.js', 'http://v42z.github.io/plugins/addon.js', 'http://v42z.github.io/plugins/on.js');
            plug.url = (plug.url + '').replace('http://v42z.github.io/plugins/all.js', 'http://v42z.github.io/plugins/addon.js', 'http://v42z.github.io/plugins/on.js');
        }
    });

    // Если были изменения, сохраняем обновленный список плагинов
    if (updateplugins) {
        Lampa.Storage.set('plugins', JSON.stringify(plugins));
        console.log('Updated plugins list:', plugins);
    } else {
        console.log('No new plugins to install');
    }

    // Загружаем все плагины из обновленного списка
    plugins.forEach(function(plugin) {
        if (plugin.url) {
            $.getScript(plugin.url, function() {
                console.log('Загружен плагин:', plugin.url);
            }).fail(function(jqxhr, settings, exception) {
                console.error('Не удалось загрузить плагин:', plugin.url, 'Ошибка:', exception);
            });
        }
    });
})();
