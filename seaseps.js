(function() {
    'use strict';

    // Инициализация платформы TV
    Lampa.Platform.tv();

    // Функция для декодирования массива строк
    function decodeArray() {
        return [
            'Lang', 'complite', '.full-start__tags', 'active', 'episode_number',
            'interface', 'origin', ' из ', 'table', '', '', 
            '.full-start__poster,.full-start-new__poster', 'last_episode_to_air', 
            'console', '((.+)+)+$', 'error', '4942482TqICyq', 'apply', 'lampa',
            '626770McOlCK', 'prototype', ' ', 'tmdb', '4791357YFtvTO', 
            'constructor', 'log', 'find', 'Noty', 'toString', '82aAYgsg', 
            '{}.constructor("return this ")()', '5CAdTUL', 'append', 'warn', 
            'exception', 'search', 'return (function()', 'season_number', 'show',
            '● ', '16087hNEtFk', 'source', 'Отображение состояния сериала (сезон/серия)',
            'full', 'insertAfter', '.card--new_seria', 'render', 'component', 
            'div[data-name="card_interfice_reactions"]', 'next_episode_to_air', '',
            'ready', 'translate', 'card', 'season_and_seria', '3189SYAXuV', 
            'get', 'Storage', ' сезон завершен', 'now', 'Ошибка', '4338320JfqSeI',
            'type', 'info', '.full-start-new__details', 'addParam', 'app', 
            'length', 'Manifest', 'episode_count', 'bind', 'activity', 'Серия',
            '3234924lnBXLd', 'Activity', 'innerWidth', 'Listener', 'Сезон: ',
            'seasons', 'follow', '1012jnfRhn'
        ];
    }

    // Функция для выполнения операций с декодированным массивом
    function performOperations(decodeArray) {
        var decodedArray = decodeArray();
        
        // Пример использования decodedArray
        console.log(decodedArray);
        
        // Добавление нового параметра в настройки
        Lampa.SettingsApi.addParam({
            component: 'season_and_seria',
            param: {
                name: 'some_name',
                type: 'trigger',
                default: true
            },
            field: {
                name: 'some_field'
            },
            onRender: function(context) {
                setTimeout(function() {
                    $('div[data-name="season_and_seria"]').addClass('some-class');
                }, 0);
            }
        });

        // Обработка событий
        if (Lampa.Listener[decodedArray[189]] !== undefined && Lampa.Listener[decodedArray[189]].ready()) {
            Lampa.Listener.on(decodedArray[189], function(event) {
                if (event.type === decodedArray[153]) {
                    var data = Lampa.Listener[decodedArray[189]].ready().data;
                    
                    if (data.last_episode_to_air && data.season_number) {
                        var seasonNumber = data.season_number,
                            episodeNumber = data.last_episode_to_air.episode_number,
                            airDate = new Date(data.last_episode_to_air.air_date);

                        var message = seasonNumber + ' ' + decodedArray[159] + ' ' + episodeNumber;
                        
                        if (airDate <= new Date()) {
                            message += ' ' + decodedArray[18c];
                        } else {
                            message += ' ' + decodedArray[15c];
                        }
                        
                        // Вывод сообщения
                        if ($(decodedArray[17f]).length === 0) {
                            if (window.innerWidth > 0x249) {
                                $(decodedArray[15d]).append(decodedArray[15b] + Lampa.Lang.translate(message) + decodedArray[15c]);
                            } else {
                                $(decodedArray[17f]).append(decodedArray[167] + Lampa.Lang[decodedArray[186]](message) + decodedArray[184]);
                            }
                        }
                    }
                }
            });
        }
    }

    // Выполнение основной логики при запуске
    if (window.appready) {
        performOperations(decodeArray);
    } else {
        Lampa.Listener.follow(decodedArray[194], function(event) {
            if (event.name === decodedArray[185]) {
                performOperations(decodeArray);
            }
        });
    }
})();
