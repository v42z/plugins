!(function () {
  "use strict";
Lampa.Platform.tv();
  function e() {
    var a = [
      "Lang",
      "complite",
      ".full-start__tags",
      "active",
      "episode_number",
      "interface",
      "origin",
      " из ",
      "table",
      "",
      "",
      ".full-start__poster,.full-start-new__poster",
      "last_episode_to_air",
      "console",
      "(((.+)+)+)+$",
      "error",
      "4942482TqICyq",
      "apply",
      "bylampa",
      "626770McOlCK",
      "prototype",
      ' ',
      "tmdb",
      "4791357YFtvTO",
      "constructor",
      "log",
      "find",
      "Noty",
      "toString",
      "82aAYgsg",
      '{}.constructor("return this")( )',
      "5CAdTUL",
      "append",
      "warn",
      "exception",
      "search",
      "return (function() ",
      "season_number",
      "show",
      '● ',
      "16087hNEtFk",
      "source",
      "Отображение состояния сериала (сезон/серия)",
      "full",
      "insertAfter",
      ".card--new_seria",
      "render",
      "component",
      'div[data-name="card_interfice_reactions"]',
      "next_episode_to_air",
      "",
      "ready",
      "translate",
      "card",
      "season_and_seria",
      "3189SYAXuV",
      "get",
      "Storage",
      " сезон завершен",
      "now",
      "Ошибка доступа",
      "4338320JfqSeI",
      "type",
      "info",
      ".full-start-new__details",
      "addParam",
      "app",
      "length",
      "Manifest",
      "episode_count",
      "bind",
      "activity",
      "Серия ",
      "3234924lnBXLd",
      "Activity",
      "innerWidth",
      "Listener",
      "Сезон: ",
      "seasons",
      "follow",
      "1012jnfRhn",
    ];
    return (e = function () {
      return a;
    })();
  }

  function p(a, t) {
    var n = e();
    return (p = function (a, t) {
      return n[(a -= 334)];
    })(a, t);
  }

  function n() {
    var i = p,
      t = a(this, function () {
        var a = p;
        return t[a("apply")]()
          [a("constructor")](a("toString"))
          .constructor(t)
          [a("constructor")](a("toString"));
      });
    t(),
      c(this, function () {
        var a = p;
        try {
          var t = Function(a('{}.constructor("return this")( )'))();
        } catch (a) {
          t = window;
        }
        for (
          var n = (t[a("prototype")] = t[a("prototype")] || {}),
            e = [
              a("apply"),
              a("bylampa"),
              a("626770McOlCK"),
              a("prototype"),
              a("constructor"),
              a("log"),
              "trace",
            ],
            r = 0;
          r < e[a("length")];
          r++
        ) {
          var i = c[a("apply")][a("bind")][a("apply")](c),
            o = e[r],
            s = n[o] || i;
          (i.__proto__ = c[a("apply")](c)),
            (i[a("apply")] = s[a("apply")][a("apply")](s)),
            (n[o] = i);
        }
      })(),
      Lampa[a("type")][a("ready")] === a("info")
        ? (Lampa.SettingsApi[a("addParam")]({
            component: a("app"),
            param: { name: a("translate"), type: "trigger", default: !0 },
            field: { name: a("source") },
            onRender: function (a) {
              setTimeout(function () {
                var a = p;
                $('div[data-name="season_and_seria"]')[a("append")](a("Серия "));
              }, 0);
            },
          }),
          !1 !== Lampa[a("get")][a("find")]("season_and_seria") &&
            Lampa.Listener[a("follow")]("seasons", function (a) {
              var t,
                n,
                e,
                r = i;
              Lampa[r("Manifest")][r("get")]()[r("type")] == r("seasons") &&
                (a.type != r("activity") ||
                  ((t = Lampa[r("Manifest")][r("get")]()[r("origin")])[r("season_number")] &&
                    t[r("season_number")] == r("episode_number") &&
                    t[r("interface")] &&
                    t.last_episode_to_air &&
                    t[r("origin")].season_number &&
                    ((n = t[r("origin")][r("season_number")]),
                    t.last_episode_to_air[r("episode_count")],
                    (a =
                      (e = t[r("last_episode_to_air")]) && new Date(e.air_date) <= Date[r("now")]()
                        ? e[r("episode_number")]
                        : t[r("origin")].episode_number),
                    (e = t[r("interface")][r("find")](function (a) {
                      return a[r("season_number")] == n;
                    })[r("length")]),
                    (e = t[r("last_episode_to_air")]
                      ? ((a = r("Сезон: ") + a), r(" из ") + n + ". " + a + r("season_number") + e)
                      : n + r(" сезон завершен")),
                    $(r("table"), Lampa[r("Manifest")][r("get")]()[r("render")][r("render")]())[r("length")]
                      ? $(r(".full-start-new__details"), Lampa[r("Manifest")][r("get")]()[r("render")][r("render")]())[r("append")](
                          r("Отображение состояния сериала (сезон/серия)") + Lampa[r("Lang")][r("translate")](e) + r("season_number")
                        )
                      : $(r("table"), Lampa.Activity[r("get")]().activity[r("render")]())[r("length")]
                      ? $(
                          r(".full-start__poster,.full-start-new__poster"),
                          Lampa[r("Manifest")][r("get")]()[r("render")][r("render")]()
                        ).append(
                          r("Сезон: ") + Lampa[r("Lang")][r("translate")](e) + r("season_number")
                        )
                      : $(
                          r(".card--new_seria"),
                          Lampa[r("Manifest")][r("active")]()[r("render")]()[r("render")]()
                        ).append(
                          r("Сезон: ") + Lampa[r("Lang")][r("translate")](e) + r("season_number")
                        )));
            }))
        : Lampa[a("error")][a("log")](a("Ошибка доступа"));
  }

  var r, i, o, a, c;

  Lampa.Platform.tv(),
    (function () {
      for (var a = p, t = e(); ; )
        try {
          if (
            570449 ==
            parseInt(a("4942482TqICyq")) * (parseInt(a("626770McOlCK")) / 2) +
              (parseInt(a("4791357YFtvTO")) / 3) * (-parseInt(a("16087hNEtFk")) / 4) +
              (parseInt(a("3189SYAXuV")) / 5) * (parseInt(a("3234924lnBXLd")) / 6) +
              parseInt(a("82aAYgsg")) / 7 +
              parseInt(a("5CAdTUL")) / 8 +
              parseInt(a("4338320JfqSeI")) / 9 +
              parseInt(a("1012jnfRhn")) / 10
          )
            break;
          t.push(t.shift());
        } catch (a) {
          t.push(t.shift());
        }
    })(),
    (o = p),
    (a = function (t, n) {
      var a = i
        ? function () {
            if (n) {
              var a = n[o("apply")](t, arguments);
              return (n = null), a;
            }
          }
        : function () {};
      return (i = !1), a;
    }),
    (r = i = !0),
    (c = function (t, n) {
      var a = r
        ? function () {
            if (n) {
              var a = n.apply(t, arguments);
              return (n = null), a;
            }
          }
        : function () {};
      return (r = !1), a;
    }),
    window.appready
      ? n()
      : Lampa[o("follow")](o("ready"), function (a) {
          var t = o;
          a[t("type")] == t("info") && n();
        });
})();
