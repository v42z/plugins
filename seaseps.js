(function() {
    'use strict';
    Lampa.Platform.tv();
    function decodeString(index) {
        var strings = [
            'Lang', 'complite', '.full-start__tags', 'active', 'episode_number', 'interface', 'origin', ' из ', 'table', '', '', '.full-start__poster,.full-start-new__poster',
            'last_episode_to_air', 'console', '(((.+)+)+)+$', 'error', 'bylampa', 'apply', '626770McOlCK', 'prototype', ' ', 'tmdb', 'constructor', 'log', 'find', 'Noty',
            'toString', 'return(function()', 'season_number', 'show', '● ', 'source', 'Отображение состояния сериала (сезон/серия)', 'full', 'insertAfter', '.card--new_seria',
            'render', 'component', 'div[data-name="card_interfice_reactions"]', 'next_episode_to_air', '', 'ready', 'translate', 'card', 'season_and_seria', 'get', 'Storage',
            ' сезон завершен', 'now', 'Ошибка доступа', 'type', 'info', '.full-start-new__details', 'addParam', 'app', 'length', 'Manifest', 'episode_count', 'bind',
            'activity', 'Серия ', 'Activity', 'innerWidth', 'Listener', 'Сезон: ', 'seasons', 'follow', '1012jnfRhn'
        ];
        return strings[index - 0x14e];
    }
    function initialize() {
        var decoded = decodeString;
        
        // Replace decodeString calls with actual strings
        Lampa.SettingsApi.add({
            component: 'tmdb',
            param: {
                name: '1012jnfRhn',
                type: 'trigger',
                default: true
            },
            field: {
                name: 'Отображение состояния сериала (сезон/серия)'
            },
            onRender: function(element) {
                setTimeout(function() {
                    $('div[data-name="season_and_seria"]').addClass('active');
                }, 0);
            }
        });
        
        if (Lampa.Storage.get('season_and_seria') !== false) {
            Lampa.Listener.follow('activity', function(event) {
                if (Lampa.Activity.active().type === 'activity') {
                    if (event.type === 'show') {
                        var show = Lampa.Activity.active().activity['source'];
                        if (show['next_episode_to_air'] && show['next_episode_to_air'] === 'complite' && show['seasons'] && show['last_episode_to_air'] && show['last_episode_to_air']['season_number']) {
                            var seasonNumber = show['last_episode_to_air']['season_number'];
                            var episodeNumber = show['last_episode_to_air']['episode_number'];
                            var nextAirDate = show['next_episode_to_air'];
                            var currentEpisode = nextAirDate && new Date(nextAirDate['air_date']) <= new Date() ? nextAirDate['episode_number'] : show['last_episode_to_air']['episode_number'];
                            var episodeCount = show['seasons'].find(function(season) {
                                return season['season_number'] === seasonNumber;
                            })['episode_count'];
                            var displayText;
                            if (nextAirDate) {
                                var nextEpisodeDisplay = 'Серия ' + currentEpisode;
                                displayText = 'Сезон: ' + seasonNumber + '. ' + nextEpisodeDisplay + ' из ' + episodeCount;
                            } else {
                                displayText = seasonNumber + ' сезон завершен';
                            }
                            if (!$('div[data-name="season_and_seria"]', Lampa.Activity.active().activity['render']()).length) {
                                if (window.innerWidth > 585) {
                                    $('div[data-name="season_and_seria"]', Lampa.Activity.active().activity['render']()).append('<div>' + Lampa.Lang.translate(displayText) + '</div>');
                                } else {
                                    if ($('div[data-name="season_and_seria"]', Lampa.Activity.active().activity['render']()).length) {
                                        $('div[data-name="season_and_seria"]', Lampa.Activity.active().activity['render']()).append('<div class="card">' + Lampa.Lang.translate(displayText) + '</div>');
                                    } else {
                                        $('div[data-name="season_and_seria"]', Lampa.Activity.active()['render']()).append('<div class="card full">' + Lampa.Lang.translate(displayText) + '');
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
        if (window['appready']) {
            initialize();
        } else {
            Lampa.Listener.follow('ready', function(event) {
                if (event['type'] === 'app') {
                    initialize();
                }
            });
        }
    }
    initialize();
})();
