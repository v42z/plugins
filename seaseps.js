(function() {
    'use strict';
    Lampa.Platform.tv();

    function main() {
        if (Lampa.SettingsApi.get('component', 'season_and_seria') !== 'trigger') {
            Lampa.Noty.show('Отображение состояния сериала (сезон/серия)');
            return;
        }

        Lampa.SettingsApi.add({
            component: 'season_and_seria',
            param: { name: 'season_and_seria', type: 'trigger', default: true },
            field: { name: 'season_and_seria' },
            onRender: function () {
                setTimeout(() => {
                    $('div[data-name="season_and_seria"]').append('● ');
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
                                displayText = `Сезон: ${seasonNumber}. Серия ${currentEpisodeNumber} из ${episodesCount}`;
                            } else {
                                displayText = `Сезон: ${seasonNumber}`;
                            }

                            if (!$('.full-start__tags', Lampa.Activity.active().activity.render()).length) {
                                if (window.innerWidth > 361) {
                                    $('.full-start-new__details', Lampa.Activity.active().activity.render()).append(`<div>${Lampa.Lang.translate(displayText)}</div>`);
                                } else {
                                    if ($('.full-start__tags', Lampa.Activity.active().activity.render()).length) {
                                        $('.full-start-new__details', Lampa.Activity.active().activity.render()).append(`<div>${Lampa.Lang.translate(displayText)}</div>`);
                                    } else {
                                        $('.full-start__tags', Lampa.Activity.active().render()).append(`<div>${Lampa.Lang.translate(displayText)}</div>`);
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
