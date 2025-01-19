(function () {
    'use strict';

    function startsWith(str, searchString) {
        return str.lastIndexOf(searchString, 0) === 0;
    }

    var network = new Lampa.Reguest();
    var cache = {};
    var total_cnt = 0;
    var proxy_cnt = 0;
    var good_cnt = 0;
    var menu_list = [];
    var genres_map = {};
    var countries_map = {};
    var CACHE_SIZE = 100;
    var CACHE_TIME = 1000 * 60 * 60;
    var SOURCE_NAME = 'Rezka';
    var SOURCE_TITLE = 'Rezka';
    var REZKA_URL = 'https://rezka.ag/api/';

    function get(method, oncomplite, onerror) {
        var use_proxy = total_cnt >= 10 && good_cnt > total_cnt / 2;
        if (!use_proxy) total_cnt++;

        var url = REZKA_URL + method;

        network.timeout(15000);
        network.silent(url, function (json) {
            oncomplite(json);
        }, function (a, c) {
            use_proxy = !use_proxy && (proxy_cnt < 10 || good_cnt > proxy_cnt / 2);
            if (use_proxy && (a.status == 429 || a.status == 0 && a.statusText !== 'timeout')) {
                proxy_cnt++;
                network.timeout(15000);
                network.silent(url, function (json) {
                    good_cnt++;
                    oncomplite(json);
                }, onerror, false, {
                    headers: {
                        // Добавьте необходимые заголовки, если требуется
                    }
                });
            } else onerror(a, c);
        }, false, {
            headers: {
                // Добавьте необходимые заголовки, если требуется
            }
        });
    }

    function getComplite(method, oncomplite) {
        get(method, oncomplite, function () {
            oncomplite(null);
        });
    }

    function getCompliteIf(condition, method, oncomplite) {
        if (condition) getComplite(method, oncomplite);
        else {
            setTimeout(function () {
                oncomplite(null);
            }, 10);
        }
    }

    function getCache(key) {
        var res = cache[key];
        if (res) {
            var cache_timestamp = new Date().getTime() - CACHE_TIME;
            if (res.timestamp > cache_timestamp) return res.value;
            for (var ID in cache) {
                var node = cache[ID];
                if (!(node && node.timestamp > cache_timestamp)) delete cache[ID];
            }
        }
        return null;
    }

    function setCache(key, value) {
        var timestamp = new Date().getTime();
        var size = Object.keys(cache).length;
        if (size >= CACHE_SIZE) {
            var cache_timestamp = timestamp - CACHE_TIME;
            for (var ID in cache) {
                var node = cache[ID];
                if (!(node && node.timestamp > cache_timestamp)) delete cache[ID];
            }
            size = Object.keys(cache).length;
            if (size >= CACHE_SIZE) {
                var timestamps = [];
                for (var _ID in cache) {
                    var _node = cache[_ID];
                    timestamps.push(_node && _node.timestamp || 0);
                }
                timestamps.sort(function (a, b) {
                    return a - b;
                });
                cache_timestamp = timestamps[Math.floor(timestamps.length / 2)];
                for (var _ID2 in cache) {
                    var _node2 = cache[_ID2];
                    if (!(_node2 && _node2.timestamp > cache_timestamp)) delete cache[_ID2];
                }
            }
        }
        cache[key] = {
            timestamp: timestamp,
            value: value
        };
    }

    function getFromCache(method, oncomplite, onerror) {
        var json = getCache(method);
        if (json) {
            setTimeout(function () {
                oncomplite(json, true);
            }, 10);
        } else get(method, oncomplite, onerror);
    }

    function clear() {
        network.clear();
    }

    function convertElem(elem) {
        var type = elem.type === 'movie' ? 'movie' : 'tv';
        var rezka_id = elem.id || 0;
        var rating = +elem.rating || 0;
        var title = elem.name || '';
        var original_title = elem.original_name || '';
        var adult = false;
        var result = {
            "source": SOURCE_NAME,
            "type": type,
            "adult": false,
            "id": SOURCE_NAME + '_' + rezka_id,
            "title": title,
            "original_title": original_title,
            "overview": elem.description || '',
            "img": elem.poster || '',
            "background_image": elem.background || elem.poster || '',
            "genres": elem.genres && elem.genres.map(function (e) {
                if (e.name === 'для взрослых') {
                    adult = true;
                }
                return {
                    "id": e.id || 0,
                    "name": e.name,
                    "url": ''
                };
            }) || [],
            "production_companies": [],
            "production_countries": elem.countries && elem.countries.map(function (e) {
                return {
                    "name": e.name
                };
            }) || [],
            "vote_average": rating,
            "vote_count": elem.votes || 0,
            "rezka_id": rezka_id,
            "rating": rating,
            "imdb_id": elem.imdb || '',
            "imdb_rating": elem.imdb_rating || 0
        };
        result.adult = adult;

        var first_air_date = elem.year ? elem.year : '';
        var last_air_date = '';

        if (type === 'tv') {
            if (elem.start_year) first_air_date = elem.start_year;
            if (elem.end_year) last_air_date = elem.end_year;
        }

        if (type === 'tv') {
            result.name = title;
            result.original_name = original_title;
            result.first_air_date = first_air_date;
            if (last_air_date) result.last_air_date = last_air_date;
        } else {
            result.release_date = first_air_date;
        }

        if (elem.seasons) {
            var _seasons = elem.seasons || [];
            result.number_of_seasons = _seasons.length || 1;
            result.seasons = _seasons.map(function (s) {
                return convertSeason(s);
            });
            var number_of_episodes = 0;
            result.seasons.forEach(function (s) {
                number_of_episodes += s.episode_count;
            });
            result.number_of_episodes = number_of_episodes;
        }

        if (elem.cast) {
            var cast = [];
            var crew = [];
            elem.cast.forEach(function (s) {
                var person = convertPerson(s);
                if (s.role === 'actor') cast.push(person); else crew.push(person);
            });
            result.persons = {
                "cast": cast,
                "crew": crew
            };
        }

        if (elem.related) {
            var related = elem.related || [];
            result.similar = {
                "results": related.map(function (s) {
                    return convertElem(s);
                })
            };
        }

        return result;
    }

    function convertSeason(season) {
        var episodes = season.episodes || [];
        episodes = episodes.map(function (e) {
            return {
                "season_number": season.number,
                "episode_number": e.number,
                "name": e.name || 'S' + season.number + ' / ' + Lampa.Lang.translate('torrent_serial_episode') + ' ' + e.number,
                "overview": e.description || '',
                "air_date": e.release_date
            };
        });
        return {
            "season_number": season.number,
            "episode_count": episodes.length,
            "episodes": episodes,
            "name": Lampa.Lang.translate('torrent_serial_season') + ' ' + season.number,
            "overview": ''
        };
    }

    function convertPerson(person) {
        return {
            "id": person.id,
            "name": person.name || '',
            "url": '',
            "img": person.photo || '',
            "character": person.role || '',
            "job": Lampa.Utils.capitalizeFirstLetter((person.role || '').toLowerCase())
        };
    }

    function cleanTitle(str) {
        return str.replace(/[\s.,:;’'`!?]+/g, ' ').trim();
    }

    function rezkaCleanTitle(str) {
        return cleanTitle(str).replace(/^[ \/\\]+/, '').replace(/[ \/\\]+$/, '').replace(/\+( *[+\/\\])+/g, '+').replace(/([+\/\\] *)+\+/g, '+').replace(/( *[\/\\]+ *)+/g, '+');
    }

    function normalizeTitle(str) {
        return cleanTitle(str.toLowerCase().replace(/[\-\u2010-\u2015\u2E3A\u2E3B\uFE58\uFE63\uFF0D]+/g, '-').replace(/ё/g, 'е'));
    }

    function containsTitle(str, title) {
        return typeof str === 'string' && typeof title === 'string' && normalizeTitle(str).indexOf(normalizeTitle(title)) !== -1;
    }

    function getList(method) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
        var onerror = arguments.length > 3 ? arguments[3] : undefined;
        var url = method;
        if (params.query) {
            var clean_title = params.query && rezkaCleanTitle(decodeURIComponent(params.query));
            if (!clean_title) {
                onerror();
                return;
            }
            url = Lampa.Utils.addUrlComponent(url, 'search=' + encodeURIComponent(clean_title));
        }
        var page = params.page || 1;
        url = Lampa.Utils.addUrlComponent(url, 'page=' + page);
        getFromCache(url, function (json, cached) {
            var items = [];
            if (json.items && json.items.length) items = json.items;
            if (!cached && items.length) setCache(url, json);
            var results = items.map(function (elem) {
                return convertElem(elem);
            });
            results = results.filter(function (elem) {
                return !elem.adult;
            });
            var total_pages = json.total_pages || 1;
            var res = {
                "results": results,
                "url": method,
                "page": page,
                "total_pages": total_pages,
                "total_results": 0,
                "more": total_pages > page
            };
            oncomplite(res);
        }, onerror);
    }

    function _getById(id) {
        var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
        var onerror = arguments.length > 3 ? arguments[3] : undefined;
        var url = 'film/get?id=' + id;
        var film = getCache(url);
        if (film) {
            setTimeout(function () {
                oncomplite(convertElem(film));
            }, 10);
        } else {
            get(url, function (film) {
                if (film.id) {
                    setCache(url, film);
                    oncomplite(convertElem(film));
                } else onerror();
            }, onerror);
        }
    }

    function getById(id) {
        var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var oncomplite = arguments.length > 2 ? arguments[2] : undefined;
        var onerror = arguments.length > 3 ? arguments[3] : undefined;
        menu({}, function () {
            return _getById(id, params, oncomplite, onerror);
        });
    }

    function main() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
        var onerror = arguments.length > 2 ? arguments[2] : undefined;
        var parts_limit = 5;
        var parts_data = [
            function (call) {
                getList('film/popular?type=movies', params, function (json) {
                    json.title = Lampa.Lang.translate('title_now_watch');
                    call(json);
                }, call);
            },
            function (call) {
                getList('film/top?type=movies', params, function (json) {
                    json.title = Lampa.Lang.translate('title_top_movie');
                    call(json);
                }, call);
            },
            function (call) {
                getList('film/popular?type=series', params, function (json) {
                    json.title = 'Популярные сериалы';
                    call(json);
                }, call);
            },
            function (call) {
                getList('film/popular?type=miniserie', params, function (json) {
                    json.title = 'Популярные мини-сериалы';
                    call(json);
                }, call);
            },
            function (call) {
                getList('film/popular?type=tvshow', params, function (json) {
                    json.title = 'Популярные телешоу';
                    call(json);
                }, call);
            }
        ];

        function loadPart(partLoaded, partEmpty) {
            Lampa.Api.partNext(parts_data, parts_limit, partLoaded, partEmpty);
        }

        menu({}, function () {
            loadPart(oncomplite, onerror);
        });

        return loadPart;
    }

    function category() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
        var onerror = arguments.length > 2 ? arguments[2] : undefined;
        var show = ['movie', 'tv'].indexOf(params.url) > -1 && !params.genres;
        var books = show ? Lampa.Favorite.continues(params.url) : [];
        books.forEach(function (elem) {
            if (!elem.source) elem.source = 'tmdb';
        });
        books = books.filter(function (elem) {
            return [SOURCE_NAME, 'tmdb', 'cub'].indexOf(elem.source) !== -1;
        });
        var recomend = show ? Lampa.Arrays.shuffle(Lampa.Recomends.get(params.url)).slice(0, 19) : [];
        recomend.forEach(function (elem) {
            if (!elem.source) elem.source = 'tmdb';
        });
        recomend = recomend.filter(function (elem) {
            return [SOURCE_NAME, 'tmdb', 'cub'].indexOf(elem.source) !== -1;
        });
        var parts_limit = 5;
        var parts_data = [
            function (call) {
                call({
                    results: books,
                    title: params.url == 'tv' ? Lampa.Lang.translate('title_continue') : Lampa.Lang.translate('title_watched')
                });
            },
            function (call) {
                call({
                    results: recomend,
                    title: Lampa.Lang.translate('title_recomend_watch')
                });
            }
        ];

        function loadPart(partLoaded, partEmpty) {
            Lampa.Api.partNext(parts_data, parts_limit, partLoaded, partEmpty);
        }

        menu({}, function () {
            var priority_list = ['семейный', 'детский', 'короткометражка', 'мультфильм', 'аниме'];
            priority_list.forEach(function (g) {
                var id = genres_map[g];
                if (id) {
                    parts_data.push(function (call) {
                        getList('film/popular?genre=' + id + '&type=' + (params.url == 'tv' ? 'series' : 'movies'), params, function (json) {
                            json.title = Lampa.Utils.capitalizeFirstLetter(g);
                            call(json);
                        }, call);
                    });
                }
            });
            menu_list.forEach(function (g) {
                if (!g.hide && !g.separator && priority_list.indexOf(g.title) == -1) {
                    parts_data.push(function (call) {
                        getList('film/popular?genre=' + g.id + '&type=' + (params.url == 'tv' ? 'series' : 'movies'), params, function (json) {
                            json.title = Lampa.Utils.capitalizeFirstLetter(g.title);
                            call(json);
                        }, call);
                    });
                }
            });
            loadPart(oncomplite, onerror);
        });

        return loadPart;
    }

    function full() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
        var onerror = arguments.length > 2 ? arguments[2] : undefined;
        var rezka_id = '';
        if (params.card && params.card.source === SOURCE_NAME) {
            if (params.card.rezka_id) {
                rezka_id = params.card.rezka_id;
            } else if (startsWith(params.card.id + '', SOURCE_NAME + '_')) {
                rezka_id = (params.card.id + '').substring(SOURCE_NAME.length + 1);
                params.card.rezka_id = rezka_id;
            }
        }
        if (rezka_id) {
            getById(rezka_id, params, function (json) {
                var status = new Lampa.Status(4);
                status.onComplite = oncomplite;
                status.append('movie', json);
                status.append('persons', json && json.persons);
                status.append('collection', json && json.collection);
                status.append('similar', json && json.similar);
            }, onerror);
        } else onerror();
    }

    function list() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
        var onerror = arguments.length > 2 ? arguments[2] : undefined;
        var method = params.url;
        if (method === '' && params.genres) {
            method = 'film/popular?genre=' + params.genres;
        }
        getList(method, params, oncomplite, onerror);
    }

    function search() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
        var title = decodeURIComponent(params.query || '');
        var status = new Lampa.Status(1);
        status.onComplite = function (data) {
            var items = [];
            if (data.query && data.query.results) {
                var tmp = data.query.results.filter(function (elem) {
                    return containsTitle(elem.title, title) || containsTitle(elem.original_title, title);
                });
                if (tmp.length && tmp.length !== data.query.results.length) {
                    data.query.results = tmp;
                    data.query.more = true;
                }
                var movie = Object.assign({}, data.query);
                movie.results = data.query.results.filter(function (elem) {
                    return elem.type === 'movie';
                });
                movie.title = Lampa.Lang.translate('menu_movies');
                movie.type = 'movie';
                if (movie.results.length) items.push(movie);
                var tv = Object.assign({}, data.query);
                tv.results = data.query.results.filter(function (elem) {
                    return elem.type === 'tv';
                });
                tv.title = Lampa.Lang.translate('menu_tv');
                tv.type = 'tv';
                if (tv.results.length) items.push(tv);
            }
            oncomplite(items);
        };
        getList('film/search', params, function (json) {
            status.append('query', json);
        }, status.error.bind(status));
    }

    function discovery() {
        return {
            title: SOURCE_TITLE,
            search: search,
            params: {
                align_left: true,
                object: {
                    source: SOURCE_NAME
                }
            },
            onMore: function onMore(params) {
                Lampa.Activity.push({
                    url: 'film/search',
                    title: Lampa.Lang.translate('search') + ' - ' + params.query,
                    component: 'category_full',
                    page: 1,
                    query: encodeURIComponent(params.query),
                    source: SOURCE_NAME
                });
            },
            onCancel: network.clear.bind(network)
        };
    }

    function person() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
        var status = new Lampa.Status(1);
        status.onComplite = function (data) {
            var result = {};
            if (data.query) {
                var p = data.query;
                result.person = {
                    "id": p.id,
                    "name": p.name || '',
                    "url": '',
                    "img": p.photo || '',
                    "gender": p.sex === 'male' ? 2 : p.sex === 'female' ? 1 : 0,
                    "birthday": p.birthday,
                    "place_of_birth": p.birthplace,
                    "deathday": p.death,
                    "place_of_death": p.deathplace,
                    "known_for_department": p.profession || '',
                    "biography": (p.facts || []).join(' ')
                };
                var director_films = [];
                var director_map = {};
                var actor_films = [];
                var actor_map = {};
                if (p.films) {
                    p.films.forEach(function (f) {
                        if (f.role === 'director' && !director_map[f.id]) {
                            director_map[f.id] = true;
                            director_films.push(convertElem(f));
                        } else if (f.role === 'actor' && !actor_map[f.id]) {
                            actor_map[f.id] = true;
                            actor_films.push(convertElem(f));
                        }
                    });
                }
                var knownFor = [];
                if (director_films.length) {
                    director_films.sort(function (a, b) {
                        var res = b.vote_average - a.vote_average;
                        if (res) return res;
                        return a.id - b.id;
                    });
                    knownFor.push({
                        "name": Lampa.Lang.translate('title_producer'),
                        "credits": director_films
                    });
                }
                if (actor_films.length) {
                    actor_films.sort(function (a, b) {
                        var res = b.vote_average - a.vote_average;
                        if (res) return res;
                        return a.id - b.id;
                    });
                    knownFor.push({
                        "name": Lampa.Lang.translate(p.sex === 'female' ? 'title_actress' : 'title_actor'),
                        "credits": actor_films
                    });
                }
                result.credits = {
                    "knownFor": knownFor
                };
            }
            oncomplite(result);
        };
        var url = 'people/get?id=' + params.id;
        getFromCache(url, function (json, cached) {
            if (!cached && json.id) setCache(url, json);
            status.append('query', json);
        }, status.error.bind(status));
    }

    function menu() {
        var oncomplite = arguments.length > 1 ? arguments[1] : undefined;
        if (menu_list.length) oncomplite(menu_list);
        else {
            get('film/filters', function (j) {
                if (j.genres) {
                    j.genres.forEach(function (g) {
                        menu_list.push({
                            "id": g.id,
                            "title": g.name,
                            "url": '',
                            "hide": g.name === 'для взрослых',
                            "separator": !g.name
                        });
                        genres_map[g.name] = g.id;
                    });
                }
                if (j.countries) {
                    j.countries.forEach(function (c) {
                        countries_map[c.name] = c.id;
                    });
                }
                oncomplite(menu_list);
            }, function () {
                oncomplite([]);
            });
        }
    }

    function menuCategory(params, oncomplite) {
        oncomplite([]);
    }

    function seasons(tv, from, oncomplite) {
        var status = new Lampa.Status(from.length);
        status.onComplite = oncomplite;
        from.forEach(function (season) {
            var seasons = tv.seasons || [];
            seasons = seasons.filter(function (s) {
                return s.season_number === season;
            });
            if (seasons.length) {
                status.append('' + season, seasons[0]);
            } else {
                status.error();
            }
        });
    }

    var Rezka = {
        SOURCE_NAME: SOURCE_NAME,
        SOURCE_TITLE: SOURCE_TITLE,
        main: main,
        menu: menu,
        full: full,
        list: list,
        category: category,
        clear: clear,
        person: person,
        seasons: seasons,
        menuCategory: menuCategory,
        discovery: discovery
    };

    var ALL_SOURCES = [
        {
            name: 'tmdb',
            title: 'TMDB'
        },
        {
            name: 'cub',
            title: 'CUB'
        },
        {
            name: 'pub',
            title: 'PUB'
        },
        {
            name: 'filmix',
            title: 'FILMIX'
        },
        {
            name: Rezka.SOURCE_NAME,
            title: Rezka.SOURCE_TITLE
        }
    ];

    function startPlugin() {
        window.rezka_plugin = true;

        function addPlugin() {
            if (Lampa.Api.sources[Rezka.SOURCE_NAME]) {
                Lampa.Noty.show('Установлен плагин несовместимый с rezka_plugin');
                return;
            }
            Lampa.Api.sources[Rezka.SOURCE_NAME] = Rezka;
            Object.defineProperty(Lampa.Api.sources, Rezka.SOURCE_NAME, {
                get: function get() {
                    return Rezka;
                }
            });
            var sources;
            if (Lampa.Params.values && Lampa.Params.values['source']) {
                sources = Object.assign({}, Lampa.Params.values['source']);
                sources[Rezka.SOURCE_NAME] = Rezka.SOURCE_TITLE;
            } else {
                sources = {};
                ALL_SOURCES.forEach(function (s) {
                    if (Lampa.Api.sources[s.name]) sources[s.name] = s.title;
                });
            }
            Lampa.Params.select('source', sources, 'tmdb');
        }

        if (window.appready) addPlugin();
        else {
            Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') addPlugin();
            });
        }
    }

    if (!window.rezka_plugin) startPlugin();
})();