(function() {
    'use strict';
    Lampa.Platform.tv();

    const Lang = Lampa.Lang;
    const Noty = Lampa.Noty;
    const Storage = Lampa.Storage;
    const Listener = Lampa.Listener;
    const Activity = Lampa.Activity;
    const SettingsApi = Lampa.SettingsApi;

    function initialize() {
        SettingsApi.add({
            component: 'interface',
            param: {
                name: 'show_season_and_episode',
                type: 'trigger',
                default: true
            },
            field: {
                name: Lang.translate('Отображение состояния сериала (сезон/серия)')
            },
            onRender: function(render) {
                setTimeout(() => {
                    $('div[data-name="season_and_seria"]').append('<div class="card--new_seria"></div>');
                }, 0);
            }
        });

        if (!Activity.listener('season_and_seria')) {
            Listener.follow('item_change', function(item) {
                if (item.type === 'show' && item.source === 'tmdb' && item.last_episode_to_air && item.seasons) {
                    const currentSeason = item.seasons.find(season => season.season_number === item.last_episode_to_air.season_number);
                    const lastEpisodeNumber = item.last_episode_to_air.episode_number;
                    const airDate = item.last_episode_to_air.air_date;
                    const episodeCount = currentSeason.episode_count;
                    let episodeNumber = episodeCount;

                    if (airDate && new Date(airDate) <= new Date()) {
                        episodeNumber = lastEpisodeNumber;
                    }

                    const seasonText = `Сезон: ${currentSeason.season_number}`;
                    const episodeText = `Серия: ${episodeNumber}`;
                    const fullText = `${seasonText}. ${episodeText}`;

                    if (!$('.full-start__tags', Activity.active().activity.render()).length) {
                        if (window.innerWidth > 399) {
                            $('.full-start-new__details', Activity.active().activity.render()).append(`<div class="full-start__tags">${Lang.translate(fullText)}</div>`);
                        } else {
                            $('.full-start__poster,.full-start-new__poster', Activity.active().activity.render()).append(`<div class="full-start__tags">${Lang.translate(fullText)}</div>`);
                        }
                    }
                }
            });
        }
    }

    if (window.appready) {
        initialize();
    } else {
        Listener.follow('app_state', function(state) {
            if (state === 'ready') {
                initialize();
            }
        });
    }
})();
