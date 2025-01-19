(function() {
    'use strict';

    // Инициализация платформы TV
    Lampa.Platform.tv();

    // Функция для декодирования строк
    function obfuscationFunction(index) {
        var decodedStrings = obfuscationArray();
        index = index - 0xef;
        return decodedStrings[index];
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
        return strings;
    }

    // Обработка условий и настройка консоли
    (function(obfuscationFunc, expectedValue) {
        var obfuscation = obfuscationFunc;
        while (true) {
            try {
                var calculation = parseInt(obfuscation(0x125)) / 0x1 * (parseInt(obfuscation(0xf6)) / 0x2) +
                    parseInt(obfuscation(0x118)) / 0x3 +
                    parseInt(obfuscation(0xf5)) / 0x4 * (parseInt(obfuscation(0xf3)) / 0x5) +
                    parseInt(obfuscation(0x10f)) / 0x6 +
                    parseInt(obfuscation(0x134)) / 0x7 +
                    parseInt(obfuscation(0x124)) / 0x8 +
                    parseInt(obfuscation(0x123)) / 0x9;
                if (calculation === expectedValue) break;
                else obfuscation.push(obfuscation.shift());
            } catch (error) {
                obfuscation.push(obfuscation.shift());
            }
        }
    })(obfuscationFunction, 0x8ab59);

    // Функция для инициализации элементов интерфейса
    function initElements() {
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

        // Создание элемента меню
        var $menuElement = $('<div class="menu">Зарубежное</div>');
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
                            openActivity('discover/tv?first_air_date.lte=2025-12-31&first_air_date.gte=2020-01-01&without_genres=16&with_original_language=ko', 'Дорамы');
                            break;
                        case 'Турецкие сериалы':
                            openActivity('discover/tv?first_air_date.lte=2025-12-31&first_air_date.gte=2020-01-01&without_genres=16&with_original_language=tr', 'Турецкие сериалы');
                            break;
                        case 'Индийские фильмы':
                            openActivity('discover/movie?primary_release_date.lte=2025-12-31&primary_release_date.gte=2020-01-01&without_genres=16&with_original_language=hi', 'Индийские фильмы');
                            break;
                        case 'Мультфильмы':
                            openActivity('discover/tv?first_air_date.lte=2025-12-31&first_air_date.gte=2020-01-01', 'Мультфильмы', '49');
                            break;
                        case 'Аниме':
                            openActivity('discover/tv?first_air_date.lte=2025-12-31&first_air_date.gte=2020-01-01', 'Аниме', '10');
                            break;
                        case 'Prime Video':
                            openActivity('discover/tv?first_air_date.lte=2025-12-31&first_air_date.gte=2020-01-01', 'Prime Video', '190');
                            break;
                        case 'Apple TV+':
                            openActivity('discover/tv?first_air_date.lte=2025-12-31&first_air_date.gte=2020-01-01', 'Apple TV+', '255');
                            break;
                        case 'HBO':
                            openActivity('discover/tv?first_air_date.lte=2025-12-31&first_air_date.gte=2020-01-01', 'HBO', '49');
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

    // Вспомогательная функция для открытия активности
    function openActivity(url, title, networks) {
        Lampa.Activity.open({
            url: url,
            title: title,
            component: 'category_full',
            source: 'tmdb',
            card_type: 'default',
            page: 0,
            networks: networks || ''
        });
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
