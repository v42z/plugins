(function () {
    'use strict';

    // Добавление языковых строк
    function addLanguageStrings() {
        Lampa.Lang.add({
            nc_cartoon: {
                ru: "Мультфильмы",
                en: "Cartoons",
                uk: "Мультфільми",
                zh: "漫画" // Chinese translation
            }
        });
    }

    // Функция для добавления категории мультфильмов в меню
    function addCartoonCategory() {
        const NEW_ITEM_SOURCES = ["tmdb", "cub"];
        const ITEM_TV_SELECTOR = '[data-action="tv"]';
        const ITEM_MOVE_TIMEOUT = 2000;

        function moveItemAfter(item, after) {
            return setTimeout(() => {
                $(item).insertAfter($(after));
            }, ITEM_MOVE_TIMEOUT);
        }

        if (Lampa.Storage.field('nc_cartoon') === true) {
            const NEW_ITEM_ATTR = 'data-action="nc_cartoon"';
            const NEW_ITEM_SELECTOR = `[${NEW_ITEM_ATTR}]`;
            const NEW_ITEM_TEXT = Lampa.Lang.translate('nc_cartoon');

            const field = $(/* html */ `<div>${NEW_ITEM_TEXT}</div>`);
            field.on("hover:enter", function () {
                const currentSource = Lampa.Activity.active().source;
                const source = NEW_ITEM_SOURCES.includes(currentSource) ? currentSource : NEW_ITEM_SOURCES[0];

                Lampa.Activity.push({
                    url: "movie",
                    title: `${NEW_ITEM_TEXT} - ${source.toUpperCase()}`,
                    component: "category",
                    genres: 16,
                    id: 16,
                    source: source,
                    card_type: true,
                    page: 1
                });
            });

            Lampa.Menu.render().find(ITEM_TV_SELECTOR).after(field);
            moveItemAfter(NEW_ITEM_SELECTOR, ITEM_TV_SELECTOR);
        }
    }

    // Настройки для добавления категории мультфильмов
    function setupSettings() {
        Lampa.SettingsApi.addComponent({
            component: "addCategory",
            name: Lampa.Lang.translate('nc_cartoon'),
            icon: '\n' + '\n' + '\n' + '\n' + '\n' + ''
        });

        Lampa.SettingsApi.addParam({
            component: "addCategory",
            param: {
                name: "nc_cartoon",
                type: "trigger",
                default: false
            },
            field: {
                name: Lampa.Lang.translate('nc_cartoon'),
                description: "TMDB/CUB"
            },
            onChange: function (value) {
                if (value === 'true') addCartoonCategory();
                else $('body').find('.menu [data-action="nc_cartoon"]').remove();
                Lampa.Settings.update();
            }
        });
    }

    // Основная функция инициализации
    function main() {
        addLanguageStrings();
        setupSettings();

        if (Lampa.Storage.field('nc_cartoon') === true) {
            addCartoonCategory();
        }

        $('body').append(Lampa.Template.get('ncStyle', {}, true));
    }

    if (window.appready) {
        main();
    } else {
        Lampa.Listener.follow("app", function (event) {
            if (event.type === "ready") {
                main();
            }
        });
    }
})();
