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
                console.log('Item changed:', item);

                if (item.type === 'show' && item.source === 'tmdb' && item.last_episode_to_air && item.seasons) {
                    const currentSeason = item.seasons.find(season => season.season_number === item.last_episode_to_air.season_number);
                    console.log('Current Season:', currentSeason);

                    if (!currentSeason) {
                        console.error('Current season not found');
                        return;
                    }

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

                    console.log('Full Text:', fullText);

                    const renderElement = Activity.active().activity.render();
                    console.log('Render Element:', renderElement);

                    if (!$('.full-start__tags', renderElement).length) {
                        if (window.innerWidth > 399) {
                            $('.full-start-new__details', renderElement).append(`<div class="full-start__tags">${Lang.translate(fullText)}</div>`);
                        } else {
                            $('.full-start__poster,.full-start-new__poster', renderElement).append(`<div class="full-start__tags">${Lang.translate(fullText)}</div>`);
                        }
                    }
                } else {
                    console.warn('Item does not match criteria:', item);
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
