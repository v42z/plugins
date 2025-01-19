(function() {
    'use strict';
    Lampa.Platform.tv();

    if (Lampa['SettingsApi']['component'] !== 'trigger') {
        Lampa['Notify']['show']('Ошибка доступа');
        return;
    }

    Lampa['SettingsApi']['addParam']({
        'component': 'season_and_seria',
        'param': {
            'name': 'season_and_seria',
            'type': 'trigger',
            'default': true
        },
        'field': {
            'name': 'season_and_seria'
        },
        'onRender': function (_0x3ecd8b) {
            setTimeout(function () {
                $('div[data-name="season_and_seria"]').append('Отображение состояния сериала (сезон/серия)');
            }, 0);
        }
    });

    if (Lampa['Listener']['get']('season_and_seria') !== false) {
        Lampa['Listener']['bind']('item_active', function (_0x691bab) {
            if (Lampa['Player']['get']()['type'] === 'item_active' && _0x691bab['type'] === 'load') {
                var _0x375671 = Lampa['Player']['get']()['data'];
                if (_0x375671['type'] === 'show' && _0x375671['last_episode_to_air'] && _0x375671['seasons'] && _0x375671['seasons']['season_number']) {
                    var _0x47a268 = _0x375671['seasons']['season_number'],
                        _0x159435 = _0x375671['last_episode_to_air']['episode_number'],
                        _0x398950 = _0x375671['next_episode_to_air'],
                        _0x1c30b2 = _0x398950 && new Date(_0x398950['air_date']) <= Date.now() ? _0x398950['episode_number'] : _0x375671['seasons']['episode_number'],
                        _0xad1eed,
                        _0x3a9e84 = _0x375671['seasons'].find(function (_0x97310) {
                            return _0x97310['season_number'] === _0x47a268;
                        })['episode_count'];

                    if (_0x375671['next_episode_to_air']) {
                        var _0x11e59f = 'Серия ' + _0x1c30b2;
                        _0xad1eed = 'Сезон ' + _0x47a268 + '. ' + _0x11e59f + ' из ' + _0x3a9e84;
                    } else {
                        _0xad1eed = _0x47a268 + ' сезон завершен';
                    }

                    if (!$('.full-start__tags', Lampa['Player']['get']()['activity']['render']()).length) {
                        if (window.innerWidth > 617) {
                            $('.full-start__details', Lampa['Player']['get']()['activity']['render']()).append('● ' + Lampa['Lang']['translate'](_0xad1eed));
                        } else {
                            if ($('.full-start__tags', Lampa['Activity']['get']()['activity']['render']()).length) {
                                $('.full-start__details', Lampa['Player']['get']()['activity']['render']()).append('● ' + Lampa['Lang']['translate'](_0xad1eed));
                            } else {
                                $('.full-start-new__details', Lampa['Player']['get']()['activity']['render']()).append('● ' + Lampa['Lang']['translate'](_0xad1eed));
                            }
                        }
                    }
                }
            }
        });
    }

    if (window['appready']) _0x5462ef();
    else Lampa['Listener']['follow']('app_state', function (_0x32ac11) {
        if (_0x32ac11['state'] === 'ready') _0x5462ef();
    });
})();
