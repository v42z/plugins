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

    // Список URL плагинов, которые нужно установить
    var newPlugins = [
        'https://v42z.github.io/plugins/cinema.js',
        'https://v42z.github.io/plugins/on.js',
        'https://v42z.github.io/plugins/start.js',
        'https://v42z.github.io/plugins/logo.js',
        'https://v42z.github.io/plugins/rusmovies.js',
        'https://v42z.github.io/plugins/cuboff.js',
        'https://v42z.github.io/plugins/foreign.js',
        'https://v42z.github.io/plugins/jackett.js',
        'https://v42z.github.io/plugins/seaseps.js',
        'https://v42z.github.io/plugins/source.js',
        'http://llpp.in/ur/notrailer.js'
        
    ];

    // Получаем текущий список плагинов
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

    // Флаг, указывающий, были ли изменения в списке плагинов
    var updatePlugins = false;

    // Функция для проверки наличия URL в массиве плагинов
    function isPluginInstalled(url) {
        return plugins.some(plugin => plugin.url === url);
    }

    // Заменяем URL плагина plugins/all.js на новый URL
    plugins.forEach(function(plug) {
        if (plug.url && plug.url.indexOf('plugins/all.js') >= 0) {
            updatePlugins = true;
            plug.url = (plug.url + '').replace('http://v42z.github.io/plugins/all.js', 'https://v42z.github.io/plugins/addon.js');
            plug.url = (plug.url + '').replace('https://v42z.github.io/plugins/all.js', 'https://v42z.github.io/plugins/addon.js');
        }
    });

    // Добавляем новые плагины, если они еще не установлены
    newPlugins.forEach(function(newPluginUrl) {
        if (!isPluginInstalled(newPluginUrl)) {
            updatePlugins = true;
            plugins.push({ url: newPluginUrl, status: 1 }); // Включаем плагин сразу после добавления
        }
    });

    // Если были изменения, сохраняем обновленный список плагинов
    if (updatePlugins) {
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

