(function() {
    'use strict';
    Lampa.Platform.tv();

    // Объявление массива с шифрованными строками
    const strings = [
        'Lang', 'complite', '.full-start__tags', 'active', 'episode_number', 'interface', 'origin', ' из ', 'table', '', '',
        '.full-start__poster,.full-start-new__poster', 'last_episode_to_air', 'console', '(((.+)+)+)+$', 'error', '4942482TqICyq',
        'apply', 'bylampa', '626770McOlCK', 'prototype', ' ', 'tmdb', '4791357YFtvTO', 'constructor', 'log', 'find', 'Noty',
        'toString', '82aAYgsg', '{}.constructor("return this")()', '5CAdTUL', 'append', 'warn', 'exception', 'search', 'return (function() ',
        'season_number', 'show', '● ', '16087hNEtFk', 'source', 'Отображение состояния сериала (сезон/серия)', 'full', 'insertAfter',
        '.card--new_seria', 'render', 'component', 'div[data-name="card_interfice_reactions"]', 'next_episode_to_air', '', 'ready',
        'translate', 'card', 'season_and_seria', '3189SYAXuV', 'get', 'Storage', ' сезон завершен', 'now', 'Ошибка доступа', '4338320JfqSeI',
        'type', 'info', '.full-start-new__details', 'addParam', 'app', 'length', 'Manifest', 'episode_count', 'bind', 'activity',
        'Серия ', '3234924lnBXLd', 'Activity', 'innerWidth', 'Listener', 'Сезон: ', 'seasons', 'follow', '1012jnfRhn'
    ];

    // Функция для получения строки по индексу
    function getString(index) {
        return strings[index - 0x14e];
    }

    // Основная функция
    function main() {
        if (Lampa.SettingsApi.get('component', 'season_and_seria') !== 'trigger') {
            Lampa.Noty.show(getString(0x18e));
            return;
        }

        Lampa.SettingsApi.add({
            component: 'season_and_seria',
            param: { name: 'season_and_seria', type: 'trigger', default: true },
            field: { name: 'season_and_seria' },
            onRender: function () {
                setTimeout(() => {
                    $('div[data-name="season_and_seria"]').append(getString(0x182));
                }, 0);
            }
        });

        if (Lampa.Listener.follow('season_and_seria') !== false) {
            Lampa.Listener.on('load', function (data) {
                if (Lampa.Activity.active().type === 'load') {
                    if (data.type === 'load') {
                        const showData = Lampa.Activity.active().activity.data;
                        if (showData && showData.last_episode_to_air && showData.seasons && showData.seasons.length) {
                            const seasonNumber = showData.seasons[showData.seasons.length - 1].season_number;
                            const lastEpisodeNumber = showData.last_episode_to_air.episode_number;
                            const airDate = showData.last_episode_to_air.air_date;
                            const currentEpisodeNumber = new Date(airDate) <= new Date() ? lastEpisodeNumber : showData.seasons[showData.seasons.length - 1].episode_number;
                            const episodesCount = showData.seasons[showData.seasons.length - 1].episode_count;

                            let displayText;
                            if (airDate) {
                                displayText = `${getString(0x14e)}${seasonNumber}. ${getString(0x19a)}${currentEpisodeNumber}${getString(0x159)}${episodesCount}`;
                            } else {
                                displayText = `${seasonNumber}${getString(0x18c)}`;
                            }

                            if (!$('.full-start__tags', Lampa.Activity.active().activity.render()).length) {
                                if (window.innerWidth > 361) {
                                    $('.full-start-new__details', Lampa.Activity.active().activity.render()).append(`${getString(0x15b)}${Lampa.Lang.translate(displayText)}${getString(0x15c)}`);
                                } else {
                                    if ($('.full-start__tags', Lampa.Activity.active().activity.render()).length) {
                                        $('.full-start-new__details', Lampa.Activity.active().activity.render()).append(`${getString(0x167)}${Lampa.Lang.translate(displayText)}${getString(0x184)}`);
                                    } else {
                                        $('.full-start__tags', Lampa.Activity.active().render()).append(`${getString(0x179)}${Lampa.Lang.translate(displayText)}${getString(0x184)}`);
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
        main();
    } else {
        Lampa.Listener.follow('app', function (data) {
            if (data.status === 'ready') {
                main();
            }
        });
    }
})();