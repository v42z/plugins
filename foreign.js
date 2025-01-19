(function() {
    'use strict';

    Lampa.Platform.tv();

    // Обработка условий и настройка консоли
    (function(obfuscationFunc, expectedValue) {
        var obfuscation = obfuscationFunc();
        while (true) {
            try {
                var calculation = parseInt(obfuscation(0x125)) / 0x1 * (parseInt(obfuscation(0xf6)) / 0x2) +
                                parseInt(obfuscation(0x118)) / 0x3 +
                                parseInt(obfuscation(0xf5)) / 0x4 * (parseInt(obfuscation(0xf3)) / 0x5) +
                                -parseInt(obfuscation(0x10f)) / 0x6 +
                                parseInt(obfuscation(0x134)) / 0x7 +
                                parseInt(obfuscation(0x124)) / 0x8 +
                                -parseInt(obfuscation(0x123)) / 0x9;
                if (calculation === expectedValue) break;
                else obfuscation.push(obfuscation.shift());
            } catch (error) {
                obfuscation.push(obfuscation.shift());
            }
        }
    })(obfuscationFunction, 0x8ab59);

    // Функция для инициализации элементов интерфейса
    function initElements() {
        var obfuscation = obfuscationFunction;

        // Перехват методов консоли
        function interceptConsole() {
            var consoleMethods = ['log', 'warn', 'error', 'info'];
            var globalObject = (function() {
                try {
                    return Function('return this')();
                } catch (error) {
                    return window;
                }
            })();
            var originalConsole = globalObject.console = globalObject.console || {};

            for (var i = 0; i < consoleMethods.length; i++) {
                var method = consoleMethods[i];
                var originalMethod = originalConsole[method] || function() {};
                var interceptedMethod = function() {
                    originalMethod.apply(originalMethod, arguments);
                };
                interceptedMethod.toString = originalMethod.toString.bind(originalMethod);
                originalConsole[method] = interceptedMethod;
            }
        }

        interceptConsole();

        // Проверка условия и вывод сообщения
        if (Lampa.settings.get('settings_rest_source') !== 'tmdb') {
            Lampa.Noty.show('Ошибка доступа');
            return;
        }

        // Создание элемента меню
        var $menuElement = $('<div class="menu menu__list">Зарубежное</div>');
        $menuElement.on('hover:enter', function() {
            var items = [
                { title: 'Дорамы' },
                { title: 'Турецкие сериалы' },
                { title: 'Индийские фильмы' },
                { title: 'Мультфильмы' },
                { title: 'Аниме' },
                { title: 'Prime Video' },
                { title: 'Apple TV+' },
                { title: 'HBO' }
            ];

            Lampa.Controller.append({
                title: Lampa.Lang.translate('Зарубежное'),
                items: items,
                onSelect: function(item) {
                    switch (item.title) {
                        case 'Дорамы':
                            Lampa.Activity.open({
                                url: 'discover/tv?first_air_date.lte=2025-12-31&first_air_date.gte=2020-01-01&without_genres=16&with_original_language=ko',
                                title: 'Дорамы',
                                component: 'category_full',
                                source: 'tmdb',
                                card_type: 'default',
                                page: 0
                            });
                            break;
                        case 'Турецкие сериалы':
                            Lampa.Activity.open({
                                url: 'discover/tv?first_air_date.lte=2025-12-31&first_air_date.gte=2020-01-01&without_genres=16&with_original_language=tr',
                                title: 'Турецкие сериалы',
                                component: 'category_full',
                                source: 'tmdb',
                                card_type: 'default',
                                page: 0
                            });
                            break;
                        case 'Индийские фильмы':
                            Lampa.Activity.open({
                                url: 'discover/movie?primary_release_date.lte=2025-12-31&primary_release_date.gte=2020-01-01&without_genres=16&with_original_language=hi',
                                title: 'Индийские фильмы',
                                component: 'category_full',
                                source: 'tmdb',
                                card_type: 'default',
                                page: 0
                            });
                            break;
                        case 'Мультфильмы':
                            Lampa.Activity.open({
                                url: 'discover/tv?first_air_date.lte=2025-12-31&first_air_date.gte=2020-01-01',
                                title: 'Мультфильмы',
                                networks: '49',
                                component: 'category_full',
                                source: 'tmdb',
                                card_type: 'default',
                                page: 0
                            });
                            break;
                        case 'Аниме':
                            Lampa.Activity.open({
                                url: 'discover/tv?first_air_date.lte=2025-12-31&first_air_date.gte=2020-01-01',
                                title: 'Аниме',
                                networks: '10',
                                component: 'category_full',
                                source: 'tmdb',
                                card_type: 'default',
                                page: 0
                            });
                            break;
                        case 'Prime Video':
                            Lampa.Activity.open({
                                url: 'discover/tv?first_air_date.lte=2025-12-31&first_air_date.gte=2020-01-01',
                                title: 'Prime Video',
                                networks: '190',
                                component: 'category_full',
                                source: 'tmdb',
                                card_type: 'default',
                                page: 0
                            });
                            break;
                        case 'Apple TV+':
                            Lampa.Activity.open({
                                url: 'discover/tv?first_air_date.lte=2025-12-31&first_air_date.gte=2020-01-01',
                                title: 'Apple TV+',
                                networks: '255',
                                component: 'category_full',
                                source: 'tmdb',
                                card_type: 'default',
                                page: 0
                            });
                            break;
                        case 'HBO':
                            Lampa.Activity.open({
                                url: 'discover/tv?first_air_date.lte=2025-12-31&first_air_date.gte=2020-01-01',
                                title: 'HBO',
                                networks: '49',
                                component: 'category_full',
                                source: 'tmdb',
                                card_type: 'default',
                                page: 0
                            });
                            break;
                    }
                },
                onBack: function() {
                    Lampa.Controller.toggle('back');
                }
            });
        });

        $('.menu').eq(0).append($menuElement);
    }

    // Запуск инициализации при готовности приложения
    if (window.appready) {
        initElements();
    } else {
        Lampa.Listener.follow('app', 'ready', function(event) {
            if (event.type === 'ready') {
                initElements();
            }
        });
    }
})();

// Функция декодирования строк
function obfuscationFunction(index, value) {
    var decodedStrings = obfuscationFunction();
    return obfuscationFunction = function(index, value) {
        index = index - 0xef;
        var decodedString = decodedStrings[index];
        return decodedString;
    }, obfuscationFunction(index, value);
}

// Инициализация массива строк
function obfuscationArray() {
    var strings = [
        'length', 'Ошибка доступа', 'MGM+', '(((.+)+)+)+$', '.menu .menu__list', 
        'discover/tv?first_air_date.lte=2025-12-31&first_air_date.gte=2020-01-01', 
        'apply', 'return (function()', 'warn', 'Турецкие сериалы', 'Manifest', 
        'bylampa', 'settings_rest_source', 'table', 'Noty', 'true', 'Дорамы', 
        'menu', 'log', '213', '1939986NcFnJf', '1024', '__proto__', 'translate', 
        'Activity', 'origin', 'Listener', 'Netflix', 'Apple TV+', '1455276VmKcBF', 
        'toString', 'Apple TV+', 'search', 'title', 
        'discover/tv?first_air_date.lte=2025-12-31&first_air_date.gte=2020-01-01&without_genres=16&with_original_language=tr', 
        'show', 'constructor', 'category_full', 'Prime Video', 'ready', 
        '19881234bhqFrR', '6411984TIvgOc', '85FvaLho', 'MGM+', 'Дорамы', 'push', 
        '2552', 'console', '6219', 'follow', 'error', 'app', 'append', 
        'discover/tv?first_air_date.lte=2025-12-31&first_air_date.gte=2020-01-01&without_genres=16&with_original_language=ko', 
        'Controller', 'Select', 'exception', '4888093AFzSzo', 'Lang', 'Netflix', 
        'bind', 'Индийские фильмы', 'info', '272105rPJWVr', '', '64mGXRJp', '5762aGdfWs', 
        'toggle', 'tmdb', 'type', 'Индийские фильмы'
    ];
    obfuscationArray = function() {
        return strings;
    };
    return obfuscationArray();
}
