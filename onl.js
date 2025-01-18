(function() {
  'use strict';
  var Defined = {
    api: 'lampac',
    localhost: 'http://185.87.48.42:2627/', // Можно удалить или оставить для совместимости
    apn: ''
  };
  var unic_id = Lampa.Storage.get('lampac_unic_id', '');
  if (!unic_id) {
    unic_id = Lampa.Utils.uid(8).toLowerCase();
    Lampa.Storage.set('lampac_unic_id', unic_id);
  }
  if (window.rchtype == undefined) {
    window.rchtype = 'web';
    var check = function check(good) {
      window.rchtype = Lampa.Platform.is('android') ? 'apk' : good ? 'cors' : 'web';
    }
    if (Lampa.Platform.is('android') || Lampa.Platform.is('tizen')) check(true);
    else {
      var net = new Lampa.Reguest();
      net.silent('http://185.87.48.42:2627'.indexOf(location.host) >= 0 ? 'https://github.com/' : 'http://185.87.48.42:2627/cors/check', function() {
        check(true);
      }, function() {
        check(false);
      }, false, {
        dataType: 'text'
      });
    }
  }
  function BlazorNet() {
    this.net = new Lampa.Reguest();
    this.timeout = function(time) {
      this.net.timeout(time);
    };
    this.req = function(type, url, secuses, error, post) {
      var params = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      var path = url.split(Defined.localhost).pop().split('?');
      if (path[0].indexOf('http') >= 0) return this.net[type](url, secuses, error, post, params);
      DotNet.invokeMethodAsync("JinEnergy", path[0], path[1]).then(function(result) {
        if (params.dataType == 'text') secuses(result);
        else secuses(Lampa.Arrays.decodeJson(result, {}));
      })["catch"](function(e) {
        console.log('Blazor', 'error:', e);
        error(e);
      });
    };
    this.silent = function(url, secuses, error, post) {
      var params = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      this.req('silent', url, secuses, error, post, params);
    };
    this["native"] = function(url, secuses, error, post) {
      var params = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
      this.req('native', url, secuses, error, post, params);
    };
    this.clear = function() {
      this.net.clear();
    };
  }
  var Network = Lampa.Reguest;
  //var Network = Defined.api.indexOf('pwa') == 0 && typeof Blazor !== 'undefined' ? BlazorNet : Lampa.Reguest;
  function component(object) {
    var network = new Network();
    var scroll = new Lampa.Scroll({
      mask: true,
      over: true
    });
    var files = new Lampa.Explorer(object);
    var filter = new Lampa.Filter(object);
    var sources = {};
    var last;
    var source;
    var balanser;
    var initialized;
    var balanser_timer;
    var images = [];
    var number_of_requests = 0;
    var number_of_requests_timer;
    var life_wait_times = 0;
    var life_wait_timer;
    var hubConnection;
    var hub_timer;
    var filter_sources = {};
    var filter_translate = {
      season: Lampa.Lang.translate('torrent_serial_season'),
      voice: Lampa.Lang.translate('torrent_parser_voice'),
      source: Lampa.Lang.translate('settings_rest_source')
    };
    var filter_find = {
      season: [],
      voice: []
    };
    var balansers_with_search = ['eneyida', 'seasonvar', 'lostfilmhd', 'kinotochka', 'kinopub', 'kinoprofi', 'kinokrad', 'kinobase', 'filmix', 'filmixtv', 'redheadsound', 'animevost', 'animego', 'animedia', 'animebesst', 'anilibria', 'rezka', 'rhsprem', 'kodik', 'remux', 'animelib', 'kinoukr'];
    function account(url) {
      url = url + '';
      if (url.indexOf('account_email=') == -1) {
        var email = Lampa.Storage.get('account_email');
        if (email) url = Lampa.Utils.addUrlComponent(url, 'account_email=' + encodeURIComponent(email));
      }
      if (url.indexOf('uid=') == -1) {
        var uid = Lampa.Storage.get('lampac_unic_id', '');
        if (uid) url = Lampa.Utils.addUrlComponent(url, 'uid=' + encodeURIComponent(uid));
      }
      if (url.indexOf('token=') == -1) {
        var token = '';
        if (token != '') url = Lampa.Utils.addUrlComponent(url, 'token=');
      }
      return url;
    }
    function balanserName(j) {
      var bals = j.balanser;
      var name = j.name.split(' ')[0];
      return (bals || name).toLowerCase();
    }
    function clarificationSearchAdd(value){
      var id = Lampa.Utils.hash(object.movie.number_of_seasons ? object.movie.original_name : object.movie.original_title)
      var all = Lampa.Storage.get('clarification_search','{}')
      all[id] = value
      Lampa.Storage.set('clarification_search',all)
    }
    function clarificationSearchDelete(){
      var id = Lampa.Utils.hash(object.movie.number_of_seasons ? object.movie.original_name : object.movie.original_title)
      var all = Lampa.Storage.get('clarification_search','{}')
      delete all[id]
      Lampa.Storage.set('clarification_search',all)
    }
    function clarificationSearchGet(){
      var id = Lampa.Utils.hash(object.movie.number_of_seasons ? object.movie.original_name : object.movie.original_title)
      var all = Lampa.Storage.get('clarification_search','{}')
      return all[id]
    }
    this.initialize = function() {
      var _this = this;
      this.loading(true);
      filter.onSearch = function(value) {
        clarificationSearchAdd(value)
        Lampa.Activity.replace({
          search: value,
          clarification: true
        });
      };
      filter.onBack = function() {
        this.start();
      };
      filter.render().find('.selector').on('hover:enter', function() {
        clearInterval(balanser_timer);
      });
      filter.render().find('.filter--search').appendTo(filter.render().find('.torrent-filter'));
      filter.onSelect = function(type, a, b) {
        if (type == 'filter') {
          if (a.reset) {
            clarificationSearchDelete()
            this.replaceChoice({
              season: 0,
              voice: 0,
              voice_url: '',
              voice_name: ''
            });
            setTimeout(function() {
              Lampa.Select.close();
              Lampa.Activity.replace({
                clarification: 0
              });
            }, 10);
          } else {
            var url = filter_find[a.stype][b.index].url;
            var choice = _this.getChoice();
            if (a.stype == 'voice') {
              choice.voice_name = filter_find.voice[b.index].title;
              choice.voice_url = url;
            }
            choice[a.stype] = b.index;
            this.saveChoice(choice);
            this.reset();
            this.request(url);
            setTimeout(Lampa.Select.close, 10);
          }
        } else if (type == 'sort') {
          Lampa.Select.close();
          object.lampac_custom_select = a.source;
          this.changeBalanser(a.source);
        }
      };
      if (filter.addButtonBack) filter.addButtonBack();
      filter.render().find('.filter--sort span').text(Lampa.Lang.translate('lampac_balanser'));
      scroll.body().addClass('torrent-list');
      files.appendFiles(scroll.render());
      files.appendHead(filter.render());
      scroll.minus(files.render().find('.explorer__files-head'));
      scroll.body().append(Lampa.Template.get('lampac_content_loading'));
      Lampa.Controller.enable('content');
      this.loading(false);
      this.externalids().then(function() {
        return _this.createSource();
      }).then(function(json) {
        if (!balansers_with_search.find(function(b) {
          return balanser.slice(0, b.length) == b;
        })) {
          filter.render().find('.filter--search').addClass('hide');
        }
        this.search();
      })["catch"](function(e) {
        this.noConnectToServer(e);
      });
    };
    this.rch = function(json, noreset) {
      // Удаляем все сетевые запросы и связанные с ними методы
      console.log('RCH', 'Замена сетевого запроса на локальную логику');
      if (!noreset) this.find();
      else noreset();
    };
    this.externalids = function() {
      return new Promise(function(resolve, reject) {
        // Заменяем сетевой запрос на статические данные
        var staticData = {
          imdb_id: "tt1234567",
          kinopoisk_id: "1234567"
        };
        for (var name in staticData) {
          object.movie[name] = staticData[name];
        }
        resolve();
      });
    };
    this.updateBalanser = function(balanser_name) {
      var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
      last_select_balanser[object.movie.id] = balanser_name;
      Lampa.Storage.set('online_last_balanser', last_select_balanser);
    };
    this.changeBalanser = function(balanser_name) {
      this.updateBalanser(balanser_name);
      Lampa.Storage.set('online_balanser', balanser_name);
      var to = this.getChoice(balanser_name);
      var from = this.getChoice();
      if (from.voice_name) to.voice_name = from.voice_name;
      this.saveChoice(to, balanser_name);
      Lampa.Activity.replace();
    };
    this.requestParams = function(url) {
      var query = [];
      var card_source = object.movie.source || 'tmdb'; //Lampa.Storage.field('source')
      query.push('id=' + object.movie.id);
      if (object.movie.imdb_id) query.push('imdb_id=' + (object.movie.imdb_id || ''));
      if (object.movie.kinopoisk_id) query.push('kinopoisk_id=' + (object.movie.kinopoisk_id || ''));
      query.push('title=' + encodeURIComponent(object.clarification ? object.search : object.movie.title || object.movie.name));
      query.push('original_title=' + encodeURIComponent(object.movie.original_title || object.movie.original_name));
      query.push('serial=' + (object.movie.name ? 1 : 0));
      query.push('original_language=' + (object.movie.original_language || ''));
      query.push('year=' + ((object.movie.release_date || object.movie.first_air_date || '0000') + '').slice(0, 4));
      query.push('source=' + card_source);
      query.push('rchtype=' + window.rchtype);
      query.push('clarification=' + (object.clarification ? 1 : 0));
      if (Lampa.Storage.get('account_email', '')) query.push('cub_id=' + Lampa.Utils.hash(Lampa.Storage.get('account_email', '')));
      return url + (url.indexOf('?') >= 0 ? '&' : '?') + query.join('&');
    };
    this.getLastChoiceBalanser = function() {
      var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
      if (last_select_balanser[object.movie.id]) {
        return last_select_balanser[object.movie.id];
      } else {
        return Lampa.Storage.get('online_balanser', filter_sources.length ? filter_sources[0] : '');
      }
    };
    this.startSource = function(json) {
      return new Promise(function(resolve, reject) {
        json.forEach(function(j) {
          var name = balanserName(j);
          sources[name] = {
            url: j.url,
            name: j.name,
            show: typeof j.show == 'undefined' ? true : j.show
          };
        });
        filter_sources = Lampa.Arrays.getKeys(sources);
        if (filter_sources.length) {
          var last_select_balanser = Lampa.Storage.cache('online_last_balanser', 3000, {});
          if (last_select_balanser[object.movie.id]) {
            balanser = last_select_balanser[object.movie.id];
          } else {
            balanser = Lampa.Storage.get('online_balanser', filter_sources[0]);
          }
          if (!sources[balanser]) balanser = filter_sources[0];
          if (!sources[balanser].show && !object.lampac_custom_select) balanser = filter_sources[0];
          source = sources[balanser].url;
          resolve(json);
        } else {
          reject();
        }
      });
    };
    this.lifeSource = function() {
      var _this3 = this;
      return new Promise(function(resolve, reject) {
        // Заменяем сетевой запрос на статические данные
        var staticData = {
          online: [
            {
              name: "Filmix",
              url: "http://example.com/filmix",
              show: true
            },
            {
              name: "Seasonvar",
              url: "http://example.com/seasonvar",
              show: true
            }
          ]
        };
        filter_sources = [];
        sources = {};
        staticData.online.forEach(function(j) {
          var name = balanserName(j);
          sources[name] = {
            url: j.url,
            name: j.name,
            show: typeof j.show == 'undefined' ? true : j.show
          };
        });
        filter_sources = Lampa.Arrays.getKeys(sources);
        filter.set('sort', filter_sources.map(function(e) {
          return {
            title: sources[e].name,
            source: e,
            selected: e == balanser,
            ghost: !sources[e].show
          };
        }));
        filter.chosen('sort', [sources[balanser] ? sources[balanser].name : balanser]);
        resolve(staticData.online.filter(function(c) {
          return c.show;
        }));
      });
    };
    this.createSource = function() {
      var _this4 = this;
      return new Promise(function(resolve, reject) {
        // Заменяем сетевой запрос на статические данные
        var staticData = {
          life: true,
          memkey: "some_memkey",
          online: [
            {
              name: "Filmix",
              url: "http://example.com/filmix",
              show: true
            },
            {
              name: "Seasonvar",
              url: "http://example.com/seasonvar",
              show: true
            }
          ]
        };
        if (staticData.accsdb) return reject(staticData);
        if (staticData.life) {
          _this4.memkey = staticData.memkey;
          _this4.lifeSource().then(_this4.startSource).then(resolve)["catch"](reject);
        } else {
          _this4.startSource(staticData).then(resolve)["catch"](reject);
        }
      });
    };
    this.create = function() {
      return this.render();
    };
    this.search = function() {
      this.filter({
        source: filter_sources
      }, this.getChoice());
      this.find();
    };
    this.find = function() {
      this.request(this.requestParams(source));
    };
    this.request = function(url) {
      number_of_requests++;
      if (number_of_requests < 10) {
        // Заменяем сетевой запрос на статические данные
        var staticData = {
          videos: [
            {
              title: "Sample Video 1",
              url: "http://example.com/video1.mp4",
              quality: "HD",
              time: "120",
              subtitles: "http://example.com/subtitles1.vtt"
            },
            {
              title: "Sample Video 2",
              url: "http://example.com/video2.mp4",
              quality: "SD",
              time: "90",
              subtitles: "http://example.com/subtitles2.vtt"
            }
          ]
        };
        this.parse(JSON.stringify(staticData));
        clearTimeout(number_of_requests_timer);
        number_of_requests_timer = setTimeout(function() {
          number_of_requests = 0;
        }, 4000);
      } else this.empty();
    };
    this.parseJsonDate = function(str, name) {
      try {
        var html = $('' + str + '');
        var elems = [];
        html.find(name).each(function() {
          var item = $(this);
          var data = JSON.parse(item.attr('data-json'));
          var season = item.attr('s');
          var episode = item.attr('e');
          var text = item.text();
          if (!object.movie.name) {
            if (text.match(/\d+p/i)) {
              if (!data.quality) {
                data.quality = {};
                data.quality[text] = data.url;
              }
              text = object.movie.title;
            }
            if (text == 'По умолчанию') {
              text = object.movie.title;
            }
          }
          if (episode) data.episode = parseInt(episode);
          if (season) data.season = parseInt(season);
          if (text) data.text = text;
          data.active = item.hasClass('active');
          elems.push(data);
        });
        return elems;
      } catch (e) {
        return [];
      }
    };
    this.getFileUrl = function(file, call) {
      var _this = this;
      if(Lampa.Storage.field('player') !== 'inner' && file.stream && Lampa.Platform.is('apple')){
        var newfile = Lampa.Arrays.clone(file)
        newfile.method = 'play'
        newfile.url = file.stream
        call(newfile, {});
      }
      else if (file.method == 'play') call(file, {});
      else {
        Lampa.Loading.start(function() {
          Lampa.Loading.stop();
          Lampa.Controller.toggle('content');
          network.clear();
        });
        // Заменяем сетевой запрос на статические данные
        var staticData = {
          url: "http://example.com/static_video.mp4",
          quality: {
            "HD": "http://example.com/static_video_hd.mp4",
            "SD": "http://example.com/static_video_sd.mp4"
          },
          subtitles: "http://example.com/static_subtitles.vtt"
        };
        Lampa.Loading.stop();
        call(staticData, staticData);
      }
    };
    this.toPlayElement = function(file) {
      var play = {
        title: file.title,
        url: file.url,
        quality: file.qualitys,
        timeline: file.timeline,
        subtitles: file.subtitles,
        callback: file.mark
      };
      return play;
    };
    this.appendAPN = function(data) {
      if (Defined.api.indexOf('pwa') == 0 && Defined.apn.length && data.url && typeof data.url == 'string' && data.url.indexOf(Defined.apn) == -1) data.url_reserve = Defined.apn + data.url;
    };
    this.setDefaultQuality = function(data) {
      if (Lampa.Arrays.getKeys(data.quality).length) {
        for (var q in data.quality) {
          if (parseInt(q) == Lampa.Storage.field('video_quality_default')) {
            data.url = data.quality[q];
            this.appendAPN(data);
            break;
          }
        }
      }
    };
    this.display = function(videos) {
      var _this5 = this;
      this.draw(videos, {
        onEnter: function onEnter(item, html) {
          this5.getFileUrl(item, function(json, json_call) {
            if (json && json.url) {
              var playlist = [];
              var first = _this5.toPlayElement(item);
              first.url = json.url;
              first.headers = json.headers;
              first.quality = json_call.quality || item.qualitys;
              first.subtitles = json.subtitles;
              first.vast_url = json.vast_url;
              first.vast_msg = json.vast_msg;
              _this5.appendAPN(first);
              _this5.setDefaultQuality(first);
              if (item.season) {
                videos.forEach(function(elem) {
                  var cell = _this5.toPlayElement(elem);
                  if (elem == item) cell.url = json.url;
                  else {
                    if (elem.method == 'call') {
                      if (Lampa.Storage.field('player') !== 'inner') {
                        cell.url = elem.stream;
                        delete cell.quality
                      } else {
                        cell.url = function(call) {
                          this5.getFileUrl(elem, function(stream, stream_json) {
                            if (stream.url) {
                              cell.url = stream.url;
                              cell.quality = stream_json.quality || elem.qualitys;
                              cell.subtitles = stream.subtitles;
                              _this5.appendAPN(cell);
                              _this5.setDefaultQuality(cell);
                              elem.mark();
                            } else {
                              cell.url = '';
                              Lampa.Noty.show(Lampa.Lang.translate('lampac_nolink'));
                            }
                            call();
                          }, function() {
                            cell.url = '';
                            call();
                          });
                        };
                      }
                    } else {
                      cell.url = elem.url;
                    }
                  }
                  _this5.appendAPN(cell);
                  _this5.setDefaultQuality(cell);
                  playlist.push(cell);
                }); //Lampa.Player.playlist(playlist) 
              } else {
                playlist.push(first);
              }
              if (playlist.length > 1) first.playlist = playlist;
              if (first.url) {
                Lampa.Player.play(first);
                Lampa.Player.playlist(playlist);
                item.mark();
                _this5.updateBalanser(balanser);
              } else {
                Lampa.Noty.show(Lampa.Lang.translate('lampac_nolink'));
              }
            } else Lampa.Noty.show(Lampa.Lang.translate('lampac_nolink'));
          }, true);
        },
        onContextMenu: function onContextMenu(item, html, data, call) {
          this5.getFileUrl(item, function(stream) {
            call({
              file: stream.url,
              quality: item.qualitys
            });
          }, true);
        }
      });
      this.filter({
        season: filter_find.season.map(function(s) {
          return s.title;
        }),
        voice: filter_find.voice.map(function(b) {
          return b.title;
        })
      }, this.getChoice());
    };
    this.parse = function(str) {
      var json = Lampa.Arrays.decodeJson(str, {});
      if (Lampa.Arrays.isObject(str) && str.rch) json = str;
      if (json.rch) return this.rch(json