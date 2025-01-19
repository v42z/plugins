(function() {
    'use strict';
    Lampa.Platform.tv();

    // Расшифрованные строки
    var _0x1da9c3 = [
        'Lang', 'complite', '.full-start__tags', 'active', 'episode_number', 'interface', 'origin', ' из ', 'table', '', '',
        '.full-start__poster,.full-start-new__poster', 'last_episode_to_air', 'console', '(((.+)+)+)+$', 'error', '4942482TqICyq',
        'apply', '', '626770McOlCK', 'prototype', ' ', 'tmdb', '4791357YFtvTO', 'constructor', 'toString', '82aAYgsg',
        '{}.constructor("return this")()', '5CAdTUL', 'append', 'warn', 'exception', 'search', 'return (function() ',
        'season_number', 'show', '● ', '16087hNEtFk', 'source', 'Отображение состояния сериала (сезон/серия)', 'full', 'insertAfter',
        '.card--new_seria', 'render', 'component', 'div[data-name="card_interfice_reactions"]', 'next_episode_to_air', '',
        'ready', 'translate', 'card', 'season_and_seria', '3189SYAXuV', 'get', 'Storage', ' сезон завершен', 'now', 'Ошибка доступа',
        '4338320JfqSeI', 'type', 'info', '.full-start-new__details', 'addParam', 'app', 'length', 'Manifest', 'episode_count',
        'bind', 'activity', 'Серия ', '3234924lnBXLd', 'Activity', 'innerWidth', 'Listener', 'Сезон: ', 'seasons', 'follow', '1012jnfRhn'
    ];

    function _0x4c3c(index) {
        return _0x1da9c3[index - 0x14e];
    }

    (function(obfuscated, key) {
        var decrypt = _0x4c3c;
        var array = obfuscated();
        while (true) {
            try {
                var result = -parseInt(decrypt(0x17a)) / 0x1 * (parseInt(decrypt(0x16f)) / 0x2) + parseInt(decrypt(0x189)) / 0x3 * (-parseInt(decrypt(0x151)) / 0x4) + parseInt(decrypt(0x171)) / 0x5 * (parseInt(decrypt(0x162)) / 0x6) + -parseInt(decrypt(0x19b)) / 0x7 + parseInt(decrypt(0x18f)) / 0x8 + parseInt(decrypt(0x169)) / 0x9 + parseInt(decrypt(0x165)) / 0xa;
                if (result === key) break;
                else array.push(array.shift());
            } catch (error) {
                array.push(array.shift());
            }
        }
    })(_0x2a98, 0x8b451);

    (function() {
        var decrypt = _0x4c3c;

        function _0x5462ef() {
            var get = decrypt;
            var _0x4bc1f2 = (function() {
                var flag = true;
                return function(func, context) {
                    var wrapper = flag ? function() {
                        var decrypt = _0x4c3c;
                        if (context) {
                            var result = context[decrypt(0x163)].apply(func, arguments);
                            return context = null, result;
                        }
                    } : function() {};
                    return flag = false, wrapper;
                };
            })();
            var _0xd64cae = (function() {
                var flag = true;
                return function(func, context) {
                    var wrapper = flag ? function() {
                        if (context) {
                            var result = context['apply'](func, arguments);
                            return context = null, result;
                        }
                    } : function() {};
                    return flag = false, wrapper;
                };
            })();

            _0x4bc1f2();
            _0xd64cae();

            if (Lampa[get(0x196)][get(0x158)] !== get(0x164)) {
                Lampa[get(0x16d)][get(0x178)](get(0x18e));
                return;
            }

            Lampa['SettingsApi'][get(0x193)]({
                'component': get(0x157),
                'param': {
                    'name': get(0x188),
                    'type': 'trigger',
                    'default': true
                },
                'field': {
                    'name': get(0x17c)
                },
                'onRender': function(component) {
                    setTimeout(function() {
                        var get = _0x4c3c;
                        $('div[data-name="season_and_seria"]')[get(0x17e)](get(0x182));
                    }, 0);
                }
            });

            if (Lampa[get(0x18b)][get(0x18a)]('season_and_seria') !== false) {
                Lampa['Listener'][get(0x150)](get(0x17d), function(event) {
                    var get = _0x4c3c;
                    if (Lampa[get(0x19c)][get(0x155)]()[get(0x181)] == get(0x17d)) {
                        if (event['type'] == get(0x153)) {
                            var showData = Lampa[get(0x19c)][get(0x155)]()[get(0x187)];
                            if (showData[get(0x17b)] && showData[get(0x17b)] == get(0x168) && showData[get(0x14f)] && showData['last_episode_to_air'] && showData[get(0x15e)]['season_number']) {
                                var seasonNumber = showData[get(0x15e)][get(0x177)];
                                var episodeNumber = showData['last_episode_to_air'][get(0x156)];
                                var airDate = showData[get(0x183)];
                                var currentEpisode = airDate && new Date(airDate['air_date']) <= Date[get(0x18d)]() ? airDate[get(0x156)] : showData[get(0x15e)]['episode_number'];
                                var episodeName, episodeCount = showData[get(0x14f)][get(0x16c)](function(season) {
                                    var get = _0x4c3c;
                                    return season[get(0x177)] == seasonNumber;
                                })[get(0x197)];
                                if (showData[get(0x183)]) {
                                    var seriesInfo = get(0x19a) + currentEpisode;
                                    episodeName = get(0x14e) + seasonNumber + '. ' + seriesInfo + get(0x159) + episodeCount;
                                } else {
                                    episodeName = seasonNumber + get(0x18c);
                                }
                                if (!$('div.season_and_seria', Lampa[get(0x19c)][get(0x155)]()[get(0x199)][get(0x180)]())[get(0x195)]) {
                                    if (window[get(0x19d)] > 0x249) {
                                        $('div.full-start-new__details', Lampa[get(0x19c)][get(0x155)]()[get(0x199)][get(0x180)]())[get(0x172)](get(0x15b) + Lampa[get(0x152)]['translate'](episodeName) + get(0x15c));
                                    } else {
                                        if ($('div.season_and_seria', Lampa['Activity'][get(0x155)]()['activity'][get(0x180)]()).length) {
                                            $('div.full-start-new__details', Lampa[get(0x19c)][get(0x155)]()[get(0x199)]['render']())[get(0x172)](get(0x167) + Lampa['Lang'][get(0x186)](episodeName) + get(0x184));
                                        } else {
                                            $('div.card--new_seria', Lampa[get(0x19c)]['active']()[get(0x199)]['render']())[get(0x172)](get(0x179) + Lampa['Lang'][get(0x186)](episodeName) + '');
                                        }
                                    }
                                }
                            }
                        }
                    }
                });
            }

            if (window['appready']) {
                _0x5462ef();
            } else {
                Lampa[decrypt(0x19e)]['follow'](decrypt(0x194), function(event) {
                    var get = decrypt;
                    if (event[get(0x190)] == get(0x185)) {
                        _0x5462ef();
                    }
                });
            }
        }

        _0x5462ef();
    })();
})();
