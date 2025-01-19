(function() {
    'use strict';
    Lampa.Platform.tv();

    // Массив строковых литералов
    var _0x1da9c3 = [
        'Lang', 'complite', '.full-start__tags', 'active', 'episode_number', 'interface', 'origin', ' из ', 'table', '', '', 
        '.full-start__poster,.full-start-new__poster', 'last_episode_to_air', 'console', '(((.+)+)+)+$', 'error', '4942482TqICyq', 
        'apply', 'lampa', '626770McOlCK', 'prototype', ' ', 'tmdb', '4791357YFtvTO', 'constructor', 'log', 'find', 'Noty', 
        'toString', '82aAYgsg', '{}.constructor("return this")()', '5CAdTUL', 'append', 'warn', 'exception', 'search', 
        'return(function()', 'season_number', 'show', '● ', '16087hNEtFk', 'source', 'Отображение состояния сериала (сезон/серия)', 
        'full', 'insertAfter', '.card--new_seria', 'render', 'component', 'div[data-name="card_interfice_reactions"]', 
        'next_episode_to_air', '', 'ready', 'translate', 'card', 'season_and_seria', '3189SYAXuV', 'get', 'Storage', 
        ' сезон завершен', 'now', 'Ошибка', '4338320JfqSeI', 'type', 'info', '.full-start-new__details', 'addParam', 'app', 
        'length', 'Manifest', 'episode_count', 'bind', 'activity', 'Серия ', '3234924lnBXLd', 'Activity', 'innerWidth', 
        'Listener', 'Сезон: ', 'seasons', 'follow', '1012jnfRhn'
    ];

    // Функция для получения строкового литерала по индексу
    function _0x4c3c(index) {
        index = index - 0x14e;
        return _0x1da9c3[index];
    }

    // Основная функция
    function main() {
        Lampa.SettingsApi.add({
            component: _0x4c3c(0x193), // 'settings'
            param: { 
                name: _0x4c3c(0x188), // 'season_and_seria'
                type: 'trigger', 
                default: true 
            },
            field: { 
                name: _0x4c3c(0x17c) // 'season_and_seria_field'
            },
            onRender: function(item) {
                setTimeout(function() {
                    $('div[data-name="season_and_seria"]').append('<div class="season-and-seria"></div>');
                }, 0);
            }
        });

        if (Lampa.Listener.follow('season_and_seria') !== false) {
            Lampa.Listener.follow('activity_change', function(event) {
                if (event.type === 'change' && event.activity === 'show') {
                    var data = Lampa.Activity.active().activity;
                    if (data.tmdb && data.tmdb.season_number && data.tmdb.episode_number && data.last_episode_to_air && data.seasons) {
                        var currentSeason = data.tmdb.season_number,
                            currentEpisode = data.tmdb.episode_number,
                            nextEpisodeAirDate = data.last_episode_to_air.air_date,
                            nextEpisodeNumber = nextEpisodeAirDate && new Date(nextEpisodeAirDate) <= Date.now() ? data.last_episode_to_air.episode_number : data.tmdb.episode_number,
                            seasonTitle = '',
                            episodesInCurrentSeason = data.seasons.find(function(season) {
                                return season.season_number === currentSeason;
                            }).episode_count;

                        if (nextEpisodeAirDate) {
                            var nextEpisodeDisplay = currentSeason + '.' + nextEpisodeNumber;
                            seasonTitle = 'Сезон: ' + currentSeason + '. Серия: ' + nextEpisodeDisplay;
                        } else {
                            seasonTitle = currentSeason;
                        }

                        if (!$('.season-and-seria', Lampa.Activity.active().activity.render()).length) {
                            if (window.innerWidth > 620) {
                                $('.full-start-new__details', Lampa.Activity.active().activity.render()).append('<div class="season-and-seria">' + Lampa.Lang.translate(seasonTitle) + '</div>');
                            } else {
                                $('.full-start-new__details', Lampa.Activity.active().activity.render()).append('<div class="season-and-seria">' + Lampa.Lang.translate(seasonTitle) + '</div>');
                            }
                        }
                    }
                }
            });
        }

        if (window.appready) {
            main();
        } else {
            Lampa.Listener.follow('appready', function(event) {
                if (event.state === 'ready') {
                    main();
                }
            });
        }
    }

    main();
})();
