(function () {
  'use strict';

  // Статический плейлист
  var staticPlaylist = {
    name: 'My Static Playlist',
    playlist: {
      menu: [
        {
          name: 'All Channels',
          count: 3
        },
        {
          name: 'Movies',
          count: 1
        }
      ],
      channels: [
        {
          id: '1',
          name: 'Channel 1',
          logo: 'http://example.com/logo1.png',
          group: 'All Channels',
          url: 'http://tv.new-ton.net.ru/plamik.m3u'
        },
        {
          id: '2',
          name: 'Channel 2',
          logo: 'http://example.com/logo2.png',
          group: 'All Channels',
          url: 'http://example.com/channel2.m3u8'
        },
        {
          id: '3',
          name: 'Channel 3',
          logo: 'http://example.com/logo3.png',
          group: 'All Channels',
          url: 'http://example.com/channel3.m3u8'
        },
        {
          id: '4',
          name: 'Movie Channel',
          logo: 'http://example.com/movie_logo.png',
          group: 'Movies',
          url: 'http://example.com/movie_channel.m3u8'
        }
      ]
    },
    secuses: true
  };

  // Остальная часть кода...
var Api = /*#__PURE__*/function () {
  function Api() {
    classCallCheck(this, Api);
  }
  _createClass(Api, null, [{
    key: "get",
    value: function get(method, catch_error) {
      var _this = this;
      return new Promise(function (resolve, reject) {
        var account = Lampa.Storage.get('account', '{}');
        if (!account.token) return catch_error ? reject(Lang.translate('account_login_failed')) : resolve();
        this.network.silent(_this.api_url + method, resolve, catch_error ? reject : resolve, false, {
          headers: {
            token: account.token,
            profile: account.profile.id
          }
        });
      });
    }
  }, {
    key: "time",
    value: function time(call) {
      this.network.silent(this.api_url + 'time', call, function () {
        call({
          time: Date.now()
        });
      });
    }
  }, {
    key: "m3u",
    value: function m3u(url) {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        var account = Lampa.Storage.get('account', '{}');
        if (!account.token) return reject(Lampa.Lang.translate('account_login_failed'));
        _this2.network.timeout(20000);
        _this2.network.native(url, function (str) {
          try {
            var file = new File([str], "playlist.m3u", {
              type: "text/plain"
            });
            var formData = new FormData($('')[0]);
            formData.append("file", file, "playlist.m3u");
            $.ajax({
              url: _this2.api_url + 'lampa',
              type: 'POST',
              data: formData,
              async: true,
              cache: false,
              contentType: false,
              timeout: 20000,
              enctype: 'multipart/form-data',
              processData: false,
              headers: {
                token: account.token,
                profile: account.profile.id
              },
              success: function success(j) {
                if (j.secuses) resolve(j); else reject(Lampa.Lang.translate('account_export_fail_600') + ' (' + (j.text || j.message) + ')');
              },
              error: function error(e) {
                e.from_error = 'M3U Function (Failed upload to CUB)';
                reject(e);
              }
            });
          } catch (e) {
            e.from_error = 'M3U Function';
            reject(e);
          }
        }, function (e) {
          e.from_error = 'M3U Function (Failed to download file)';
          reject(e);
        }, false, {
          dataType: 'text'
        });
      });
    }
  }, {
    key: "list",
    value: function list() {
      var _this3 = this;
      return new Promise(function (resolve, reject) {
        Promise.all([_this3.get('list'), DB.getDataAnyCase('playlist', 'list')]).then(function (result) {
          if (result[0]) DB.rewriteData('playlist', 'list', result[0]);
          var playlist = result[0] || result[1] || {
            list: []
          };
          playlist.list = playlist.list.concat(Lampa.Storage.get('iptv_playlist_custom', '[]'));
          resolve(playlist);
        })["catch"](reject);
      });
    }
  }, {
    key: "m3uClient",
    value: function m3uClient(url) {
      var _this4 = this;
      return new Promise(function (resolve, reject) {
        _this4.network.timeout(20000);
        _this4.network[window.god_enabled ? 'native' : 'silent'](url, function (str) {
          if (typeof str != 'string' || str.substr(0, 7).toUpperCase() !== "#EXTM3U") {
            return reject(Lampa.Lang.translate('torrent_parser_request_error') + ' [M3UClient Function (The file is not M3U)]');
          }
          var list;
          var catchup;
          try {
            str = str.replace(/tvg-rec="(\d+)"/g, 'catchup="default" catchup-days="$1"');
            list = Parser$1.parse(str);
          } catch (e) {}
          if (list && list.items) {
            var channels = [];
            if (list.header.raw.indexOf('catchup') >= 0) {
              catchup = {
                days: 0,
                source: '',
                type: ''
              };
              var m_days = list.header.raw.match(/catchup-days="(\d+)"/);
              var m_type = list.header.raw.match(/catchup="([a-z]+)"/);
              var m_source = list.header.raw.match(/catchup-source="(.*?)"/);
              if (m_days) catchup.days = m_days[1];
              if (m_type) catchup.type = m_type[1];
              if (m_source) catchup.source = m_source[1];
            }
            for (var i = 0; i < list.items.length; i++) {
              var item = list.items[i];
              var name = item.name.trim();
              var channel = {
                id: item.tvg && item.tvg.id ? item.tvg.id : null,
                name: name.replace(/ \((\+\d+)\)/g, ' $1').replace(/\s+(\s|ⓢ|ⓖ|ⓥ|ⓞ|Ⓢ|Ⓖ|Ⓥ|Ⓞ)/g, ' ').trim(),
                logo: item.tvg && item.tvg.logo && item.tvg.logo.indexOf('http') == 0 ? item.tvg.logo : null,
                group: item.group.title,
                url: item.url,
                catchup: item.catchup,
                timeshift: item.timeshift,
                tvg: item.tvg
              };
              if (!item.catchup.type && catchup && item.raw.indexOf('catchup-enable="1"') >= 0) {
                channel.catchup = catchup;
              }
              channels.push(channel);
            }
            var result = {
              menu: [],
              channels: channels
            };
            result.menu.push({
              name: '',
              count: channels.length
            });
            var _loop = function _loop(_i) {
              var channel = channels[_i];
              var group = channel.group;
              var find = result.menu.find(function (item) {
                return item.name === group;
              });
              if (find) {
                find.count++;
              } else {
                result.menu.push({
                  name: group,
                  count: 1
                });
              }
            };
            for (var _i = 0; _i < channels.length; _i++) {
              _loop(_i);
            }
            resolve({
              name: '',
              playlist: result,
              secuses: true
            });
          } else {
            reject(Lampa.Lang.translate('torrent_parser_empty') + ' [M3UClient Function (Parsing m3u failed)]');
          }
        }, function (e) {
          e.from_error = 'M3UClient Function (Failed to load)';
          reject(e);
        }, false, {
          dataType: 'text'
        });
      });
    }
  }, {
    key: "playlist",
    value: function playlist(data) {
      var _this5 = this;
      var id = data.id;
      return new Promise(function (resolve, reject) {
        Promise.all([DB.getDataAnyCase('playlist', id), Params.get(id)]).then(function (result) {
          var playlist = result[0];
          var params = result[1];
          if (playlist && params) {
            var time = {
              'always': 0,
              'hour': 1000 * 60 * 60,
              'hour12': 1000 * 60 * 60 * 12,
              'day': 1000 * 60 * 60 * 24,
              'week': 1000 * 60 * 60 * 24 * 7,
              'none': 0
            };
            if (params.update_time + time[params.update] > Date.now() || params.update == 'none') return resolve(playlist);
          }
          var secuses = function secuses(result) {
            DB.rewriteData('playlist', id, result)["finally"](function () {
              if (params) params.update_time = Date.now();
              Params.set(id, params)["finally"](resolve.bind(resolve, result));
            });
          };
          var error = function error(e) {
            playlist ? resolve(playlist) : reject(e);
          };
          if (params && params.loading == 'lampa' || data.custom) {
            this5[Lampa.Account.logged() ? 'm3u' : 'm3uClient'](data.url).then(secuses)["catch"](error);
          } else {
            // Вместо загрузки с сервера используем статический плейлист
            resolve(staticPlaylist);
          }
        })["catch"](function (e) {
          e.from_error = 'Playlist Function (Something went wrong)';
          reject(e);
        });
      });
    }
  }, {
    key: "program",
    value: function program(data) {
      var _this6 = this;
      return new Promise(function (resolve, reject) {
        var days = Lampa.Storage.field('iptv_guide_custom') ? Lampa.Storage.field('iptv_guide_save') : 3;
        var tvg_id = data.tvg && data.tvg.id ? data.tvg.id : data.channel_id;
        var tvg_name = data.tvg && data.tvg.name ? data.tvg.name : '';
        var loadCUB = function loadCUB() {
          var id = Lampa.Storage.field('iptv_guide_custom') ? tvg_id : data.channel_id;
          _this6.network.timeout(5000);
          _this6.network.silent(_this6.api_url + 'program/' + data.channel_id + '/' + data.time + '?full=true', function (result) {
            DB.rewriteData('epg', id, result.program)["finally"](resolve.bind(resolve, result.program));
          }, function (a) {
            if (a.status == 500) DB.rewriteData('epg', id, [])["finally"](resolve.bind(resolve, [])); else reject();
          });
        };
        var loadEPG = function loadEPG(id, call) {
          DB.getDataAnyCase('epg', id, 60 * 24 * days).then(function (epg) {
            if (epg) resolve(epg); else call();
          });
        };
        if (tvg_id) {
          loadEPG(tvg_id, function () {
            DB.getDataAnyCase('epg_channels', (tvg_name || data.name).toLowerCase()).then(function (gu) {
              if (gu) loadEPG(gu.id, loadCUB); else loadCUB();
            });
          });
        } else reject();
      });
    }
  }]);
  return Api;
}();

_defineProperty(Api, "network", new Lampa.Reguest());
_defineProperty(Api, "api_url", Lampa.Utils.protocol() + Lampa.Manifest.cub_domain + '/api/iptv/');

// Остальная часть кода...
