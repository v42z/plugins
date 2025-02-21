(function() {
    'use strict';

    // Список URL плагинов, которые нужно установить
    var newPlugins = [
        'https://lv42z.github.io/plugins/addon.js',
        'https://lv42z.github.io/plugins/on.js',
        'https://lv42z.github.io/plugins/start.js'
	    'https://lv42z.github.io/plugins/cuboff.js'
	    'https://lv42z.github.io/plugins/foreign.js'
	    'https://lv42z.github.io/plugins/logo.js'
	    'https://lv42z.github.io/plugins/nots.js'
	    'https://lv42z.github.io/plugins/rusmovies.js'
	    'https://lv42z.github.io/plugins/seaseps.js'
	    'https://lv42z.github.io/plugins/source.js'
	    'https://lv42z.github.io/plugins/cinema.js'
    ];

    // Получаем текущий список плагинов
    var plugins = Lampa.Storage.get('plugins', '[]');

    // Преобразуем строку в массив, если это необходимо
    if (typeof plugins === 'string') {
        plugins = JSON.parse(plugins);
    }

    // Флаг, указывающий, были ли изменения в списке плагинов
    var updatePlugins = false;

    // Функция для проверки наличия URL в массиве плагинов
    function isPluginInstalled(url) {
        return plugins.some(plugin => plugin.url === url);
    }

    // Добавляем новые плагины, если они еще не установлены
    newPlugins.forEach(function(newPluginUrl) {
        if (!isPluginInstalled(newPluginUrl)) {
            updatePlugins = true;
            plugins.push({ url: newPluginUrl });
        }
    });

    // Если были изменения, сохраняем обновленный список плагинов
    if (updatePlugins) {
        Lampa.Storage.set('plugins', JSON.stringify(plugins));
    }

    // Загружаем все плагины из обновленного списка
    plugins.forEach(function(plugin) {
        if (plugin.url) {
            $.getScript(plugin.url, function() {
                console.log('Загружен плагин:', plugin.url);
            }).fail(function() {
                console.error('Не удалось загрузить плагин:', plugin.url);
            });
        }
    });
})();
