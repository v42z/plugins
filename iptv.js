(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (!it) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;
        var F = function () {};
        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function () {
        it = it.call(o);
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

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

  var Utils = /*#__PURE__*/ function () {
    function Utils() {
      _classCallCheck(this, Utils);
    }

    _createClass(Utils, null, [{
      key: "clear",
      value: function clear(str) {
        return str.replace(/\"/g, '"').replace(/\'/g, "'").replace(/\&/g, "&").replace(/\&.+?;/g, '');
      }
    }, {
      key: "isHD",
      value: function isHD(name) {
        var math = name.toLowerCase().match(' .hd$| .нd$| .hd | .нd | hd$| нd&| hd | нd ');
        return math ? math[0].trim() : '';
      }
    }, {
      key: "clearHDSD",
      value: function clearHDSD(name) {
        return name.replace(/ hd$| нd$| .hd$| .нd$/gi, '').replace(/ sd$/gi, '').replace(/ hd | нd | .hd | .нd /gi, ' ').replace(/ sd /gi, ' ');
      }
    }, {
      key: "clearMenuName",
      value: function clearMenuName(name) {
        return name.replace(/^\d+\. /gi, '').replace(/^\d+ /gi, '');
      }
    }, {
      key: "clearChannelName",
      value: function clearChannelName(name) {
        return this.clearHDSD(this.clear(name));
      }
    }, {
      key: "hasArchive",
      value: function hasArchive(channel) {
        if (channel.catchup) {
          var days = parseInt(channel.catchup.days);
          if (!isNaN(days) && days > 0) return days;
        }
        return 0;
      }
    }, {
      key: "canUseDB",
      value: function canUseDB() {
        return DB.db && Lampa.Storage.get('iptv_use_db', 'indexdb') == 'indexdb';
      }
    }]);

    return Utils;
  }();

  var favorites = [];
  var Favorites = /*#__PURE__*/ function () {
    function Favorites() {
      _classCallCheck(this, Favorites);
    }

    _createClass(Favorites, null, [{
      key: "load",
      value: function load() {
        var _this = this;

        return new Promise(function (resolve, reject) {
          if (Utils.canUseDB()) {
            DB.getData('favorites').then(function (result) {
              favorites = result || [];
            })["finally"](resolve);
          } else {
            this.nosuport();
            resolve();
          }
        });
      }
    }, {
      key: "nosuport",
      value: function nosuport() {
        favorites = Lampa.Storage.get('iptv_favorite_channels', '[]');
      }
    }, {
      key: "list",
      value: function list() {
        return favorites;
      }
    }, {
      key: "key",
      value: function key() {
        return Lampa.Storage.get('iptv_favotite_save', 'url');
      }
    }, {
      key: "find",
      value: function find(favorite) {
        var _this2 = this;

        return favorites.find(function (a) {
          return a[_this2.key()] == favorite[_this2.key()];
        });
      }
    }, {
      key: "remove",
      value: function remove(favorite) {
        var _this3 = this;

        return new Promise(function (resolve, reject) {
          var find = favorites.find(function (a) {
            return a[_this3.key()] == favorite[_this3.key()];
          });
          if (find) {
            if (Utils.canUseDB()) {
              DB.deleteData('favorites', favorite[_this3.key()]).then(function () {
                Lampa.Arrays.remove(favorites, find);
                resolve();
              })["catch"](reject);
            } else {
              Lampa.Arrays.remove(favorites, find);
              Lampa.Storage.set('iptv_favorite_channels', favorites);
              resolve();
            }
          } else reject();
        });
      }
    }, {
      key: "add",
      value: function add(favorite) {
        var _this4 = this;

        return new Promise(function (resolve, reject) {
          if (!favorites.find(function (a) {
            return a[_this4.key()] == favorite[_this4.key()];
          })) {
            Lampa.Arrays.extend(favorite, {
              view: 0,
              added: Date.now()
            });
            if (Utils.canUseDB()) {
              DB.addData('favorites', favorite[_this4.key()], favorite).then(function () {
                favorites.push(favorite);
                resolve();
              })["catch"](reject);
            } else {
              favorites.push(favorite);
              Lampa.Storage.set('iptv_favorite_channels', favorites);
              resolve();
            }
          } else reject();
        });
      }
    }, {
      key: "update",
      value: function update(favorite) {
        var _this5 = this;

        return new Promise(function (resolve, reject) {
          if (favorites.find(function (a) {
            return a[_this5.key()] == favorite[_this5.key()];
          })) {
            Lampa.Arrays.extend(favorite, {
              view: 0,
              added: Date.now()
            });
            if (Utils.canUseDB()) DB.updateData('favorites', favorite[_this5.key()], favorite).then(resolve)["catch"](reject); else {
              Lampa.Storage.set('iptv_favorite_channels', favorites);
              resolve();
            }
          } else reject();
        });
      }
    }, {
      key: "toggle",
      value: function toggle(favorite) {
        return this.find(favorite) ? this.remove(favorite) : this.add(favorite);
      }
    }]);

    return Favorites;
  }();

  var locked = [];
  var Locked = /*#__PURE__*/ function () {
    function Locked() {
      _classCallCheck(this, Locked);
    }

    _createClass(Locked, null, [{
      key: "load",
      value: function load() {
        var _this = this;

        return new Promise(function (resolve, reject) {
          if (Utils.canUseDB()) {
            DB.getData('locked').then(function (result) {
              locked = result || [];
            })["finally"](resolve);
          } else {
            this.nosuport();
            resolve();
          }
        });
      }
    }, {
      key: "nosuport",
      value: function nosuport() {
        locked = Lampa.Storage.get('iptv_locked_channels', '[]');
      }
    }, {
      key: "list",
      value: function list() {
        return locked;
      }
    }, {
      key: "find",
      value: function find(key) {
        return locked.find(function (a) {
          return a == key;
        });
      }
    }, {
      key: "format",
      value: function format(type, element) {
        return type == 'channel' ? 'channel:' + element[Lampa.Storage.get('iptv_favotite_save', 'url')] : type == 'group' ? 'group:' + element : 'other:' + element;
      }
    }, {
      key: "remove",
      value: function remove(key) {
        return new Promise(function (resolve, reject) {
          var find = locked.find(function (a) {
            return a == key;
          });
          if (find) {
            if (Utils.canUseDB()) {
              DB.deleteData('locked', key).then(function () {
                Lampa.Arrays.remove(locked, find);
                resolve();
              })["catch"](reject);
            } else {
              Lampa.Arrays.remove(locked, find);
              Lampa.Storage.set('iptv_locked_channels', locked);
              resolve();
            }
          } else reject();
        });
      }
    }, {
      key: "add",
      value: function add(key) {
        return new Promise(function (resolve, reject) {
          if (!locked.find(function (a) {
            return a == key;
          })) {
            if (Utils.canUseDB()) {
              DB.addData('locked', key, key).then(function () {
                locked.push(key);
                resolve();
              })["catch"](reject);
            } else {
              locked.push(key);
              Lampa.Storage.set('iptv_locked_channels', locked);
              resolve();
            }
          } else reject();
        });
      }
    }, {
      key: "update",
      value: function update(key) {
        return new Promise(function (resolve, reject) {
          if (locked.find(function (a) {
            return a == key;
          })) {
            if (Utils.canUseDB()) DB.updateData('locked', key, key).then(resolve)["catch"](reject); else {
              Lampa.Storage.set('iptv_locked_channels', locked);
              resolve();
            }
          } else reject();
        });
      }
    }, {
      key: "toggle",
      value: function toggle(key) {
        return this.find(key) ? this.remove(key) : this.add(key);
      }
    }]);

    return Locked;
  }();

  var DB = new Lampa.DB('cub_iptv', ['playlist', 'params', 'epg', 'favorites', 'other', 'epg_channels', 'locked'], 6);
  DB.logs = true;
  DB.openDatabase().then(function () {
    Favorites.load();
    Locked.load();
  })["catch"](function () {
    Favorites.nosuport();
    Locked.nosuport();
  });

  function fixParams(params_data) {
    var params = params_data || {};
    Lampa.Arrays.extend(params, {
      update: 'none',
      update_time: Date.now(),
      loading: 'cub'
    });
    return params;
  }

  var Params = /*#__PURE__*/ function () {
    function Params() {
      _classCallCheck(this, Params);
    }

    _createClass(Params, null, [{
      key: "get",
      value: function get(id) {
        return new Promise(function (resolve) {
          if (Utils.canUseDB()) {
            DB.getDataAnyCase('params', id).then(function (params) {
              resolve(fixParams(params));
            });
          } else {
            resolve(fixParams(Lampa.Storage.get('iptv_playlist_params_' + id, '{}')));
          }
        });
      }
    }, {
      key: "set",
      value: function set(id, params) {
        if (Utils.canUseDB()) {
          return DB.rewriteData('params', id, fixParams(params));
        } else {
          return new Promise(function (resolve) {
            Lampa.Storage.set('iptv_playlist_params_' + id, fixParams(params));
            resolve();
          });
        }
      }
    }, {
      key: "value",
      value: function value(params, name) {
        return Lampa.Lang.translate('iptv_params_' + params[name]);
      }
    }]);

    return Params;
  }();

  function isValidPath(string) {
    var url;
    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }
    return url.protocol === "http:" || url.protocol === "https:";
  }

  var Parser$1 = {};
  Parser$1.parse = function (content) {
    var playlist = {
      header: {},
      items: []
    };
    var lines = content.split('\n').map(parseLine);
    var firstLine = lines.find(function (l) {
      return l.index === 0;
    });
    if (!firstLine || !/^#EXTM3U/.test(firstLine.raw)) throw new Error('Playlist is not valid');
    playlist.header = parseHeader(firstLine);
    var i = 0;
    var items = {};
    var _iterator = _createForOfIteratorHelper(lines),
      _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var line = _step.value;
        if (line.index === 0) continue;
        var string = line.raw.toString().trim();
        if (string.startsWith('#EXTINF:')) {
          var EXTINF = string;
          items[i] = {
            name: EXTINF.getName(),
            tvg: {
              id: EXTINF.getAttribute('tvg-id'),
              name: EXTINF.getAttribute('tvg-name'),
              logo: EXTINF.getAttribute('tvg-logo'),
              url: EXTINF.getAttribute('tvg-url'),
              rec: EXTINF.getAttribute('tvg-rec')
            },
            group: {
              title: EXTINF.getAttribute('group-title')
            },
            http: {
              referrer: '',
              'user-agent': EXTINF.getAttribute('user-agent')
            },
            url: undefined,
            raw: line.raw,
            line: line.index + 1,
            catchup: {
              type: EXTINF.getAttribute('catchup'),
              days: EXTINF.getAttribute('catchup-days'),
              source: EXTINF.getAttribute('catchup-source')
            },
            timeshift: EXTINF.getAttribute('timeshift')
          };
        } else if (string.startsWith('#EXTVLCOPT:')) {
          if (!items[i]) continue;
          var EXTVLCOPT = string;
          items[i].http.referrer = EXTVLCOPT.getOption('http-referrer') || items[i].http.referrer;
          items[i].http['user-agent'] = EXTVLCOPT.getOption('http-user-agent') || items[i].http['user-agent'];
          items[i].raw += "\r\n".concat(line.raw);
        } else if (string.startsWith('#EXTGRP:')) {
          if (!items[i]) continue;
          var EXTGRP = string;
          items[i].group.title = EXTGRP.getValue() || items[i].group.title;
          items[i].raw += "\r\n".concat(line.raw);
        } else {
          if (!items[i]) continue;
          var url = string.getURL();
          var user_agent = string.getParameter('user-agent');
          var referrer = string.getParameter('referer');
          if (url && isValidPath(url)) {
            items[i].url = url;
            items[i].http['user-agent'] = user_agent || items[i].http['user-agent'];
            items[i].http.referrer = referrer || items[i].http.referrer;
            items[i].raw += "\r\n".concat(line.raw);
            i++;
          } else {
            if (!items[i]) continue;
            items[i].raw += "\r\n".concat(line.raw);
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    playlist.items = Object.values(items);
    return playlist;
  };

  function parseLine(line, index) {
    return {
      index: index,
      raw: line
    };
  }

  function parseHeader(line) {
    var supportedAttrs = ['x-tvg-url', 'url-tvg'];
    var attrs = {};
    for (var _i = 0, _supportedAttrs = supportedAttrs; _i < _supportedAttrs.length; _i++) {
      var attrName = _supportedAttrs[_i];
      var tvgUrl = line.raw.getAttribute(attrName);
      if (tvgUrl) {
        attrs[attrName] = tvgUrl;
      }
    }
    return {
      attrs: attrs,
      raw: line.raw
    };
  }

  String.prototype.getName = function () {
    var name = this.split(/[\r\n]+/).shift().split(',').pop();
    return name || '';
  };

  String.prototype.getAttribute = function (name) {
    var regex = new RegExp(name + '="(.*?)"', 'gi');
    var match = regex.exec(this);
    return match && match[1] ? match[1] : '';
  };

  String.prototype.getOption = function (name) {
    var regex = new RegExp(':' + name + '=(.*)', 'gi');
    var match = regex.exec(this);
    return match && match[1] && typeof match[1] === 'string' ? match[1].replace(/\"/g, '') : '';
  };

  String.prototype.getValue = function (name) {
    var regex = new RegExp(':(.*)', 'gi');
    var match = regex.exec(this);
    return match && match[1] && typeof match[1] === 'string' ? match[1].replace(/\"/g, '') : '';
  };

  String.prototype.getURL = function () {
    return this.split('|')[0] || '';
  };

  String.prototype.getParameter = function (name) {
    var params = this.replace(/^(.*)\|/, '');
    var regex = new RegExp(name + '=(\\w[^&]*)', 'gi');
    var match = regex.exec(params);
    return match && match[1] ? match[1] : '';
  };

  var Api = /*#__PURE__*/ function () {
    function Api() {
      _classCallCheck(this, Api);
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
          _this2.network["native"](url, function (str) {
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
            this6.network.timeout(5000);
            this6.network.silent(_this6.api_url + 'program/' + data.channel_id + '/' + data.time + '?full=true', function (result) {
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

  var Pilot = /*#__PURE__*/ function () {
    function Pilot() {
      _classCallCheck(this, Pilot);
    }

    _createClass(Pilot, null, [{
      key: "notebook",
      value: function notebook(param_name, param_set) {
        var book = Lampa.Storage.get('iptv_pilot_book', '{}');
        Lampa.Arrays.extend(book, {
          playlist: '',
          channel: -1,
          category: ''
        });
        if (typeof param_set !== 'undefined') {
          book[param_name] = param_set;
          Lampa.Storage.set('iptv_pilot_book', book);
        } else return book[param_name];
      }
    }]);

    return Pilot;
  }();

  var PlaylistItem = /*#__PURE__*/ function () {
    function PlaylistItem(playlist) {
      var _this = this;

      classCallCheck(this, PlaylistItem);
      this.playlist = playlist;
      this.item = Lampa.Template.js('cub_iptv_playlist_item');
      this.footer = this.item.find('.iptv-playlist-item__footer');
      this.params = {};
      Params.get(playlist.id).then(function (params) {
        this.params = params;
        this.drawFooter();
      });
      var name = playlist.name || '---';
      this.item.find('.iptv-playlist-item__url').text(playlist.url);
      this.item.find('.iptv-playlist-item__name-text').text(name);
      this.item.find('.iptv-playlist-item__name-ico span').text(name.slice(0, 1).toUpperCase());
      this.item.on('hover:long', this.displaySettings.bind(this)).on('hover:enter', function () {
        if (_this.deleted) return;
        Pilot.notebook('playlist', playlist.id);
        DB.rewriteData('playlist', 'active', playlist.id)["finally"](function () {
          this.listener.send('channels-load', playlist);
        });
      });
      this.item.on('update', function () {
        Params.get(playlist.id).then(function (params) {
          this.params = params;
          this.drawFooter();
        });
      });
    }

    _createClass(PlaylistItem, [{
      key: "displaySettings",
      value: function displaySettings() {
        var _this2 = this;

        if (this.deleted) return;
        var params = {
          update: ['always', 'hour', 'hour12', 'day', 'week', 'none'],
          loading: ['cub', 'lampa']
        };
        var menu = [];
        menu = menu.concat([{
          title: Lampa.Lang.translate('iptv_update'),
          subtitle: Params.value(this.params, 'update'),
          name: 'update'
        }, {
          title: Lampa.Lang.translate('iptv_loading'),
          subtitle: Params.value(this.params, 'loading'),
          name: 'loading'
        }, {
          title: Lampa.Lang.translate('iptv_remove_cache'),
          subtitle: Lampa.Lang.translate('iptv_remove_cache_descr')
        }]);
        if (this.playlist.custom) {
          menu = menu.concat([{
            title: Lampa.Lang.translate('more'),
            separator: true
          }, {
            title: Lampa.Lang.translate('iptv_playlist_change_name'),
            name: 'change',
            value: 'name'
          }, {
            title: Lampa.Lang.translate('extensions_change_link'),
            name: 'change',
            value: 'url'
          }, {
            title: Lampa.Lang.translate('extensions_remove'),
            name: 'delete'
          }]);
        }
        Lampa.Select.show({
          title: Lampa.Lang.translate('title_settings'),
          items: menu,
          onSelect: function onSelect(a) {
            if (a.name == 'change') {
              Lampa.Input.edit({
                title: Lampa.Lang.translate('iptv_playlist_add_set_' + a.value),
                free: true,
                nosave: true,
                value: _this2.playlist[a.value]
              }, function (value) {
                if (value) {
                  var list = Lampa.Storage.get('iptv_playlist_custom', '[]');
                  var item = list.find(function (n) {
                    return n.id == _this2.playlist.id;
                  });
                  if (item && item[a.value] !== value) {
                    item[a.value] = value;
                    this2.playlist[a.value] = value;
                    Lampa.Storage.set('iptv_playlist_custom', list);
                    this2.item.find('.iptv-playlist-item__' + (a.value == 'name' ? 'name-text' : 'url')).text(value);
                    Lampa.Noty.show(Lampa.Lang.translate('iptv_playlist_' + a.value + '_changed'));
                  }
                }
                Lampa.Controller.toggle('content');
              });
            } else if (a.name == 'delete') {
              Lampa.Modal.open({
                title: '',
                align: 'center',
                html: $('' + Lampa.Lang.translate('iptv_confirm_delete_playlist') + ''),
                buttons: [{
                  name: Lampa.Lang.translate('settings_param_no'),
                  onSelect: function onSelect() {
                    Lampa.Modal.close();
                    Lampa.Controller.toggle('content');
                  }
                }, {
                  name: Lampa.Lang.translate('settings_param_yes'),
                  onSelect: function onSelect() {
                    var list = Lampa.Storage.get('iptv_playlist_custom', '[]');
