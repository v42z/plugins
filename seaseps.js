(function() {
    'use strict';
    Lampa.Platform.tv();

    var Lang = 'Lang',
        complite = 'complite',
        fullStartTags = '.full-start__tags',
        active = 'active',
        episodeNumber = 'episode_number',
        interface = 'interface',
        origin = 'origin',
        из = ' из ',
        table = 'table',
        fullStartPoster = '.full-start__poster,.full-start-new__poster',
        lastEpisodeToAir = 'last_episode_to_air',
        console = 'console',
        error = 'error',
        log = 'log',
        find = 'find',
        Noty = 'Noty',
        toString = 'toString',
        append = 'append',
        warn = 'warn',
        exception = 'exception',
        search = 'search',
        seasonNumber = 'season_number',
        show = 'show',
        full = 'full',
        insertAfter = 'insertAfter',
        cardNewSeria = '.card--new_seria',
        render = 'render',
        component = 'component',
        divDataNameCardInterfaceReactions = 'div[data-name="card_interfice_reactions"]',
        nextEpisodeToAir = 'next_episode_to_air',
        ready = 'ready',
        translate = 'translate',
        card = 'card',
        seasonAndSeria = 'season_and_seria',
        get = 'get',
        Storage = 'Storage',
        episodeCount = 'episode_count',
        bind = 'bind',
        activity = 'activity',
        source = 'source',
        fullStartDetails = '.full-start-new__details',
        addParam = 'addParam',
        app = 'app',
        length = 'length',
        Manifest = 'Manifest',
        seasons = 'seasons',
        follow = 'follow';

    // Остальная часть кода...

    function onAppReady() {
        Lampa.SettingsApi.add({
            component: 'settings',
            param: { name: 'season_and_seria', type: 'trigger', default: true },
            field: { name: 'season_and_seria_field' },
            onRender: function(item) {
                setTimeout(function() {
                    $('div[data-name="season_and_seria"]').append('<div class="season-and-seria"></div>');
                }, 0);
            }
        });

        if (Lampa.Listener.follow('activity_change', function(event) {
            if (event.type == 'change' && event.activity == 'show') {
                var data = Lampa.Activity.active().activity;
                if (data.tmdb && data.tmdb.season_number && data.tmdb.episode_number && data.last_episode_to_air && data.seasons) {
                    var currentSeason = data.tmdb.season_number,
                        currentEpisode = data.tmdb.episode_number,
                        nextEpisodeAirDate = data.last_episode_to_air.air_date,
                        nextEpisodeNumber = nextEpisodeAirDate && new Date(nextEpisodeAirDate) <= Date.now() ? data.last_episode_to_air.episode_number : data.tmdb.episode_number,
                        seasonTitle = '',
                        episodesInCurrentSeason = data.seasons.find(function(season) {
                            return season.season_number == currentSeason;
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
                            if ($('.season-and-seria', Lampa.Activity.active().activity.render()).length) {
                                $('.full-start-new__details', Lampa.Activity.active().activity.render()).append('<div class="season-and-seria">' + Lampa.Lang.translate(seasonTitle) + '</div>');
                            } else {
                                $('.full-start-new__details', Lampa.Activity.active().activity.render()).append('<div class="season-and-seria">' + Lampa.Lang.translate(seasonTitle) + '</div>');
                            }
                        }
                    }
                }
            }
        }));

        if (window.appready) onAppReady();
        else Lampa.Listener.follow('appready', function(event) {
            if (event.state == 'ready') onAppReady();
        });
    }
})();
