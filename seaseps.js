(function() {
    'use strict';
    Lampa.Platform.tv();

    // Функция для получения строковых значений по индексу
    function getWord(index) {
        var words = [
            'Lang', 'complite', '.full-start__tags', 'active', 'episode_number', 'interface', 'origin', ' из ', 'table', '', '',
            '.full-start__poster,.full-start-new__poster', 'last_episode_to_air', 'console', '(((.+)+)+)+$', 'error',
            '4942482TqICyq', 'apply', 'lampa', '626770McOlCK', 'prototype', ' ', 'tmdb', '4791357YFtvTO', 'constructor',
            'log', 'find', 'Noty', 'toString', '{}.constructor("return this")()', '5CAdTUL', 'append', 'warn', 'exception',
            'search', 'return (function() ', 'season_number', 'show', '● ', '16087hNEtFk', 'source',
            'Отображение состояния сериала (сезон/серия)', 'full', 'insertAfter', '.card--new_seria', 'render', 'component',
            'div[data-name="card_interfice_reactions"]', 'next_episode_to_air', '', 'ready', 'translate', 'card',
            'season_and_seria', '3189SYAXuV', 'get', 'Storage', ' сезон завершен', 'now', 'Ошибка доступа', '4338320JfqSeI',
            'type', 'info', '.full-start-new__details', 'addParam', 'app', 'length', 'Manifest', 'episode_count', 'bind',
            'activity', 'Серия ', '3234924lnBXLd', 'Activity', 'innerWidth', 'Listener', 'Сезон: ', 'seasons', 'follow',
            '1012jnfRhn'
        ];
        return words[index];
    }

    function initialize() {
        // Настройка параметра для отображения состояния сезона и серии
        Lampa.SettingsApi.addParam({
            'component': getWord(215), // 'season_and_seria'
            'param': {
                'name': getWord(279), // 'display_season_and_seria'
                'type': 'trigger',
                'default': true
            },
            'field': {
                'name': 'Display season and episode status' // Локализация на английском
            },
            'onRender': function() {
                setTimeout(function() {
                    $('div[data-name="season_and_seria"]').remove();
                }, 0);
            }
        });

        if (Lampa.Storage.get(getWord(215)) !== false) { // 'season_and_seria'
            Lampa.Listener.follow('content', function(event) {
                if (Lampa.Activity.data().controller == getWord(306)) { // 'content'
                    if (event.type == getWord(306)) { // 'content'
                        var data = event.data;
                        if (data.origin && data.origin == getWord(223) && data.seasons && data.last_episode_to_air && data.seasons.length) { // 'tmdb'
                            var currentSeasonNumber = data.seasons.find(function(season) {
                                return season.season_number == data.last_episode_to_air.season_number;
                            }).season_number;

                            var lastEpisodeNumber = data.last_episode_to_air.episode_number;
                            var nextEpisode = data.next_episode_to_air;
                            var currentEpisodeNumber = nextEpisode && new Date(nextEpisode.air_date) <= Date.now() ? nextEpisode.episode_number : data.seasons.find(function(season) {
                                return season.season_number == currentSeasonNumber;
                            }).episode_count;

                            var displayText;
                            if (nextEpisode) {
                                displayText = `Сезон ${currentSeasonNumber}. Серия ${currentEpisodeNumber} из ${data.seasons.find(function(season) { return season.season_number == currentSeasonNumber; }).episode_count}`;
                            } else {
                                displayText = `Сезон ${currentSeasonNumber}`;
                            }

                            if (!$('.season_and_seria', Lampa.Activity.data().activity.render()).length) {
                                if (window.innerWidth > 600) {
                                    $('.some_selector', Lampa.Activity.data().activity.render()).after('<div class="season_and_seria">' + Lampa.Lang.translate(displayText) + '</div>');
                                } else {
                                    if ($('.season_and_seria', Lampa.Activity.data().activity.render()).length) {
                                        $('.some_other_selector', Lampa.Activity.data().activity.render()).append('<div class="season_and_seria">' + Lampa.Lang.translate(displayText) + '</div>');
                                    } else {
                                        $('.another_selector', Lampa.Activity.data().activity.render()).append('<div class="season_and_seria">' + Lampa.Lang.translate(displayText) + '</div>');
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    if (window.appready) {
        initialize();
    } else {
        Lampa.Ready.follow('app', function(event) {
            if (event.type == 'ready') {
                initialize();
            }
        });
    }
})();
