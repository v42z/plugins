(function() {
    'use strict';

    Lampa.Platform.tv();

    function initializeSettingsApi() {
        var componentName = 'season_and_seria';
        var paramName = 'show_season_and_seria';
        var fieldName = 'Отображение состояния сериала (сезон/серия)';

        Lampa.SettingsApi.addParam({
            component: componentName,
            param: {
                name: paramName,
                type: 'trigger',
                default: true
            },
            field: {
                name: fieldName
            },
            onRender: function(component) {
                setTimeout(function() {
                    $('div[data-name="season_and_seria"]').remove();
                }, 0);
            }
        });

        if (Lampa.Storage.field(componentName)) {
            Lampa.Listener.follow('app', function(event) {
                if (event.type === 'content') {
                    var contentData = Lampa.Activity.active().data;
                    if (contentData && contentData.last_episode_to_air && contentData.last_episode_to_air.season_number) {
                        var currentSeasonNumber = contentData.last_episode_to_air.season_number;
                        var lastEpisodeNumber = contentData.last_episode_to_air.episode_number;
                        var nextEpisodeToAir = contentData.next_episode_to_air;
                        var totalEpisodes = contentData.episode_count;
                        var seasonInfo = contentData.seasons.find(function(season) {
                            return season.season_number == currentSeasonNumber;
                        });

                        var seasonStatus = '';
                        if (nextEpisodeToAir) {
                            var nextEpisodeDate = new Date(nextEpisodeToAir.air_date);
                            if (nextEpisodeDate <= new Date()) {
                                seasonStatus = 'Сезон: ' + currentSeasonNumber + ' ● Серия: ' + nextEpisodeToAir.episode_number + ' из ' + totalEpisodes;
                            } else {
                                seasonStatus = 'Сезон: ' + currentSeasonNumber + ' ● Сезон завершен';
                            }
                        } else {
                            seasonStatus = 'Сезон: ' + currentSeasonNumber + ' ● Серия: ' + lastEpisodeNumber + ' из ' + totalEpisodes;
                        }

                        if (!$('.card--new_seria', Lampa.Activity.active().activity.render()).length) {
                            if (window.innerWidth > 600) {
                                $('.full-start__poster,.full-start-new__poster', Lampa.Activity.active().activity.render()).after('<div class="full-start__tags">' + Lampa.Lang.translate(seasonStatus) + '</div>');
                            } else {
                                if ($('.card--new_seria', Lampa.Activity.active().activity.render()).length) {
                                    $('.full-start-new__details', Lampa.Activity.active().activity.render()).append('<div class="full-start__tags">' + Lampa.Lang.translate(seasonStatus) + '</div>');
                                } else {
                                    $('.card_interfice_reactions', Lampa.Activity.active().activity.render()).append('<div class="full-start__tags">' + Lampa.Lang.translate(seasonStatus) + '</div>');
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    if (window.appready) {
        initializeSettingsApi();
    } else {
        Lampa.Listener.follow('ready', function(event) {
            if (event.type === 'ready') {
                initializeSettingsApi();
            }
        });
    }
})();
