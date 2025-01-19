(function () {
  'use strict';

  // ... остальной код ...

  // Встроенный плейлист
  const embeddedPlaylist = {
    list: [
      {
        id: '1',
        custom: true,
        url: 'http://tv.new-ton.net.ru/plamik.m3u',
        name: 'Example Playlist'
      },
      // Добавьте другие плейлисты по аналогии
    ]
  };

  var Playlist = /*#__PURE__*/function () {
    function Playlist(listener) {
      classCallCheck(this, Playlist);
      this.listener = listener;
      this.html = Lampa.Template.js('cub_iptv_list');
      this.scroll = new Lampa.Scroll({
        mask: true,
        over: true
      });
      this.html.find('.iptv-list__title').text(Lampa.Lang.translate('iptv_select_playlist'));
      this.html.find('.iptv-list__items').append(this.scroll.render(true));
    }

    _createClass(Playlist, [{
      key: "item",
      value: function item(data) {
        var _this = this;
        var item = new PlaylistItem(data);
        item.listener = this.listener;
        var elem = item.render();
        elem.on('hover:focus', function () {
          this.last = elem;
          this.scroll.update(_this.last);
        }).on('hover:hover hover:touch', function () {
          this.last = elem;
          Navigator.focused(elem);
        });
        return item;
      }
    }, {
      key: "list",
      value: function list(playlist) {
        var _this2 = this;
        this.scroll.clear();
        this.scroll.reset();
        this.html.find('.iptv-list__text').html(Lampa.Lang.translate('iptv_select_playlist_text'));
        var add = Lampa.Template.js('cub_iptv_list_add_custom');
        add.find('.iptv-playlist-item__title').text(Lampa.Lang.translate('iptv_playlist_add_new'));
        add.on('hover:enter', function () {
          Lampa.Input.edit({
            title: Lampa.Lang.translate('iptv_playlist_add_set_url'),
            free: true,
            nosave: true,
            value: ''
          }, function (value) {
            if (value) {
              var data = {
                id: Lampa.Utils.uid(),
                custom: true,
                url: value,
                name: ''
              };
              Lampa.Storage.add('iptv_playlist_custom', data);
              var item = _this2.item(data);
              add.parentNode.insertBefore(item.render(), add.nextSibling);
            }
            Lampa.Controller.toggle('content');
          });
        });
        add.on('hover:focus', function () {
          this2.last = add;
          this2.scroll.update(_this2.last);
        });
        this.scroll.append(add);
        playlist.list.reverse().forEach(function (data) {
          var item = _this2.item(data);
          _this2.scroll.append(item.render());
        });
        this.listener.send('display', this);
      }
    }, {
      key: "main",
      value: function main() {
        // Используем встроенный плейлист
        this.list(embeddedPlaylist);
      }
    }, {
      key: "load",
      value: function load() {
        var _this3 = this;
        Promise.all([Promise.resolve(embeddedPlaylist), DB.getDataAnyCase('playlist', 'active')]).then(function (result) {
          var playlist = result[0];
          var active = result[1] || Pilot.notebook('playlist');
          if (playlist) {
            if (active) {
              var find = playlist.list.find(function (l) {
                return l.id == active;
              });
              if (find) {
                _this3.listener.send('channels-load', find);
              } else _this3.list(playlist);
            } else _this3.list(playlist);
          } else _this3.empty();
        })["catch"](this.empty.bind(this));
      }
    }, {
      key: "empty",
      value: function empty() {
        this.scroll.clear();
        this.scroll.reset();
        this.html.find('.iptv-list__text').html(Lampa.Lang.translate('iptv_playlist_empty'));
        var empty = Lampa.Template.js('cub_iptv_list_empty');
        empty.find('.iptv-list-empty__text').html(Lampa.Lang.translate('empty_title'));
        this.scroll.append(empty);
        this.listener.send('display', this);
      }
    }, {
      key: "toggle",
      value: function toggle() {
        var _this4 = this;
        Lampa.Controller.add('content', {
          toggle: function toggle() {
            Lampa.Controller.collectionSet(_this4.html);
            Lampa.Controller.collectionFocus(_this4.last, _this4.html);
          },
          left: function left() {
            Lampa.Controller.toggle('menu');
          },
          down: Navigator.move.bind(Navigator, 'down'),
          up: function up() {
            if (Navigator.canmove('up')) Navigator.move('up');else Lampa.Controller.toggle('head');
          },
          back: function back() {
            Lampa.Activity.backward();
          }
        });
        Lampa.Controller.toggle('content');
      }
    }, {
      key: "render",
      value: function render() {
        return this.html;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.scroll.destroy();
        this.html.remove();
      }
    }]);
    return Playlist;
  }();

  // ... остальной код ...
  
  function startPlugin() {
    window.plugin_iptv_ready = true;
    var manifest = {
      type: 'video',
      version: '1.2.8',
      name: 'IPTV',
      description: '',
      component: 'iptv',
      onMain: function onMain(data) {
        if (!Lampa.Storage.field('iptv_view_in_main')) return {
          results: []
        };
        var playlist = Lampa.Arrays.clone(Lampa.Storage.get('iptv_play_history_main_board', '[]')).reverse();
        return {
          results: playlist,
          title: Lampa.Lang.translate('title_continue'),
          nomore: true,
          line_type: 'iptv',
          cardClass: function cardClass(item) {
            return new Channel(item, playlist);
          }
        };
      }
    };
    Lampa.Manifest.plugins = manifest;

    function add() {
      var button = $("\n	\n	\n	\n	\n	\n	\n	\n	\n	".concat(window.lampa_settings.iptv ? Lampa.Lang.translate('player_playlist') : 'IPTV', "\n	"));
      button.on('hover:enter', function () {
        if (window.lampa_settings.iptv) {
          if (Lampa.Activity.active().component == 'iptv') return Lampa.Activity.active().activity.component().playlist();
        }
        Lampa.Activity.push({
          url: '',
          title: 'IPTV',
          component: 'iptv',
          page: 1
        });
      });
      $('.menu .menu__list').eq(0).append(button);
      $('body').append(Lampa.Template.get('cub_iptv_style', {}, true));
      if (window.lampa_settings.iptv) {
        $('.head .head__action.open--search').addClass('hide');
        $('.head .head__action.open--premium').remove();
        $('.head .head__action.open--feed').remove();
        $('.navigation-bar__body [data-action="main"]').unbind().on('click', function () {
          Lampa.Activity.active().activity.component().playlist();
        });
        $('.navigation-bar__body [data-action="search"]').addClass('hide');
      }
    }

    Lang$1.init();
    Templates.init();
    Settings.init();
    EPG.init();
    Guide.init();
    Lampa.Component.add('iptv', Component);
    if (window.lampa_settings.iptv) {
      Lampa.Storage.set('start_page', 'last');
      window.start_deep_link = {
        component: 'iptv'
      };
    }
    if (window.appready) add();else {
      Lampa.Listener.follow('app', function (e) {
        if (e.type == 'ready') add();
      });
    }
  }
  if (!window.plugin_iptv_ready) startPlugin();
})();