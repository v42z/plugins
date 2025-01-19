(function() {
    'use strict';
    Lampa.Platform.tv();

    function getWord(index) {
        var words = decodeArray();
        return words[index];
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

    function initialize() {
        Lampa.SettingsApi.addParam({
            'component': 'season_and_seria',
            'param': {
                'name': 'display_season_and_seria',
                'type': 'trigger',
                'default': true
            },
            'field': {
                'name': 'Display season and episode status'
            },
            'onRender': function() {
                setTimeout(function() {
                    $('div[data-name="season_and_seria"]').remove();
                }, 0);
            }
        });

        if (Lampa.Storage.get('season_and_seria') !== false) {
            Lampa.Listener.follow('content', function(event) {
                if (Lampa.Activity.data().controller == 'content') {
                    if (event.type == 'content') {
                        var data = event.data;
                        if (data.origin && data.origin == 'tmdb' && data.seasons && data.last_episode_to_air && data.seasons.length) {
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
})();
