(function() {
    'use strict';
    Lampa.Platform.tv();

    function getDecodedStrings() {
        var strings = [
            'Lang', 'complite', '.full-start__tags', 'active', 'episode_number', 'interface', 'origin', ' из ', 'table', '', '', '.full-start__poster,.full-start-new__poster',
            'last_episode_to_air', 'console', '(((.+)+)+)+$', 'error', 'bylampa', 'apply', '626770McOlCK', 'prototype', ' ', 'tmdb', 'constructor', 'log', 'find', 'Noty',
            'toString', 'return(function()', 'season_number', 'show', '● ', 'source', 'Отображение состояния сериала (сезон/серия)', 'full', 'insertAfter', '.card--new_seria',
            'render', 'component', 'div[data-name="card_interfice_reactions"]', 'next_episode_to_air', '', 'ready', 'translate', 'card', 'season_and_seria', 'get', 'Storage',
            ' сезон завершен', 'now', 'Ошибка доступа', 'type', 'info', '.full-start-new__details', 'addParam', 'app', 'length', 'Manifest', 'episode_count', 'bind',
            'activity', 'Серия ', 'Activity', 'innerWidth', 'Listener', 'Сезон: ', 'seasons', 'follow', '1012jnfRhn'
        ];
        return strings;
    }

    function decodeString(index) {
        var strings = getDecodedStrings();
        return strings[index - 0x14e];
    }

    (function() {
        var decoded = decodeString;

        function initialize() {
            Lampa.SettingsApi.add({
                component: decoded(0x157),
                param: {
                    name: decoded(0x188),
                    type: 'trigger',
                    default: true
                },
                field: {
                    name: decoded(0x17c)
                },
                onRender: function(element) {
                    setTimeout(function() {
                        $('div[data-name="season_and_seria"]').addClass(decoded(0x182));
                    }, 0);
                }
            });

            if (Lampa.Storage.get('season_and_seria') !== false) {
                Lampa.Listener.follow(decoded(0x17d), function(event) {
                    if (Lampa.Activity.active().type === decoded(0x17d)) {
                        if (event.type === decoded(0x153)) {
                            var show = Lampa.Activity.active().activity[decoded(0x187)];
                            if (show[decoded(0x17b)] && show[decoded(0x17b)] === decoded(0x168) && show[decoded(0x14f)] && show['last_episode_to_air'] && show[decoded(0x15e)]['season_number']) {
                                var seasonNumber = show[decoded(0x15e)][decoded(0x177)];
                                var episodeNumber = show['last_episode_to_air'][decoded(0x156)];
                                var nextAirDate = show[decoded(0x183)];
                                var currentEpisode = nextAirDate && new Date(nextAirDate['air_date']) <= new Date() ? nextAirDate[decoded(0x156)] : show[decoded(0x15e)]['episode_number'];
                                var episodeCount = show[decoded(0x14f)].find(function(season) {
                                    return season[decoded(0x177)] === seasonNumber;
                                })[decoded(0x197)];
                                var displayText;
                                if (nextAirDate) {
                                    var nextEpisodeDisplay = decoded(0x19a) + currentEpisode;
                                    displayText = decoded(0x14e) + seasonNumber + '. ' + nextEpisodeDisplay + decoded(0x159) + episodeCount;
                                } else {
                                    displayText = seasonNumber + decoded(0x18c);
                                }
                                if (!$('div[data-name="season_and_seria"]', Lampa.Activity.active().activity[decoded(0x199)]['render']()).length) {
                                    if (window.innerWidth > 0x249) {
                                        $('div[data-name="season_and_seria"]', Lampa.Activity.active().activity[decoded(0x199)]['render']()).append(decoded(0x15b) + Lampa.Lang.translate(displayText) + decoded(0x15c));
                                    } else {
                                        if ($('div[data-name="season_and_seria"]', Lampa.Activity.active().activity[decoded(0x180)]()).length) {
                                            $('div[data-name="season_and_seria"]', Lampa.Activity.active().activity[decoded(0x199)]['render']()).append(decoded(0x167) + Lampa.Lang.translate(displayText) + decoded(0x184));
                                        } else {
                                            $('div[data-name="season_and_seria"]', Lampa.Activity.active()[decoded(0x199)]['render']()).append(decoded(0x179) + Lampa.Lang.translate(displayText) + '');
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
                Lampa.Listener.follow(decoded(0x194), function(event) {
                    if (event[decoded(0x190)] === decoded(0x185)) {
                        initialize();
                    }
                });
            }
        }

        initialize();
    })();
})();
