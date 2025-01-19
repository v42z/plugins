(function () {
    'use strict';

    function main() {
        // Инициализация меню и настроек
        initializeMenuSort();
        bindSettings();
        addSortButtonToSettings();
    }

    function initializeMenuSort() {
        // Добавление компонента сортировки в меню
        Lampa.Settings.addComponent({
            name: 'add_menu_sort',
            onRender: function() {
                setTimeout(function() {
                    var items = getItemsMainMenu();
                    Lampa.Controller.toggle('menu');
                    if (items.length > 0) {
                        var item = jQueryToNative(items[0]);
                        Navigator.focus(item);
                    }
                }, 4000);
            }
        });
    }

    function bindSettings() {
        // Привязка кнопки сортировки к событиям
        $(document).on('hover:long', '.settings-param__name', function() {
            var item = jQueryToNative(this);
            Navigator.focus(item);
            Lampa.Controller.toggle('menu');
            Lampa.Controller.create('interface');
            setTimeout(function() {
                var items = getItemsMainMenu();
                if (items.length > 0) {
                    var item = jQueryToNative(items[0]);
                    Navigator.focus(item);
                }
            }, 4000);
        });
    }

    function addSortButtonToSettings() {
        // Добавление кнопки сортировки в настройки
        Lampa.Settings.addParam({
            component: 'sort',
            param: {
                name: 'hide_items_settings',
                description: 'press_select'
            },
            field: {
                name: 'hide_items_settings',
                description: 'press_select'
            },
            onRender: function(element) {
                element.on('hover:enter', function() {
                    setTimeout(function() {
                        getSettingsItems();
                        filterSettings();
                    }, 4000);
                });
            }
        });
    }

    function jQueryToNative(selector) {
        // Преобразование jQuery селектора в нативный DOM элемент
        if (typeof selector === 'string') {
            return document.querySelector(selector);
        } else if (selector instanceof jQuery) {
            return selector.get(0);
        } else {
            return selector;
        }
    }

    function filterMainMenu(title, checked) {
        // Фильтрация элементов главного меню
        var hiddenItems = JSON.parse(localStorage.getItem('menu_hide')) || [];
        var items = document.querySelectorAll('.menu__item');

        items.forEach(function(item) {
            if (item.textContent === title) {
                if (checked) {
                    hiddenItems.push(title);
                } else {
                    var index = hiddenItems.indexOf(title);
                    if (index !== -1) {
                        hiddenItems.splice(index, 1);
                    }
                }
            }
        });

        localStorage.setItem('menu_hide', JSON.stringify(hiddenItems));
    }

    function getItemsMainMenu() {
        // Получение элементов главного меню
        var items = document.querySelectorAll('.menu__item');
        var hiddenItems = JSON.parse(localStorage.getItem('menu_hide')) || [];

        var filteredItems = [];
        items.forEach(function(item) {
            if (!hiddenItems.includes(item.textContent)) {
                filteredItems.push(item);
            }
        });

        return filteredItems;
    }

    function filterSettings(title) {
        // Фильтрация элементов настроек
        var hiddenItems = JSON.parse(localStorage.getItem('settingsDimension')) || [];
        var items = document.querySelectorAll('.settings-param__name');

        items.forEach(function(item) {
            if (item.textContent === title) {
                if (hiddenItems.includes(title)) {
                    item.closest('.settings-param').classList.add('hide');
                } else {
                    item.closest('.settings-param').classList.remove('hide');
                }
            }
        });

        localStorage.setItem('settingsDimension', JSON.stringify(hiddenItems));
    }

    function getSettingsItems() {
        // Получение элементов настроек
        var items = document.querySelectorAll('.settings-param__name');
        var hiddenItems = JSON.parse(localStorage.getItem('settingsDimension')) || [];

        items.forEach(function(item) {
            if (!hiddenItems.includes(item.textContent)) {
                hiddenItems.push(item.textContent);
            }
        });

        localStorage.setItem('settingsDimension', JSON.stringify(hiddenItems));
    }

    function settingsSubMenu(title) {
        // Создание подменю для настроек
        Lampa.SettingsApi.createComponent({
            component: 'interface',
            param: {
                name: 'sort',
                todo: 'sort'
            },
            field: {
                icon: '<svg style="font-size: 24px; margin-right: 8px;">...</svg>'
            },
            onRender: function(element) {
                element.on('hover:enter', function() {
                    setTimeout(function() {
                        if (title === 'sort') {
                            var hiddenItems = JSON.parse(localStorage.getItem('menu_hide')) || [];
                            if (!hiddenItems.includes(title)) {
                                hiddenItems.push(title);
                                localStorage.setItem('menu_hide', JSON.stringify(hiddenItems));
                            }
                        }
                    }, 4000);
                });
            }
        });
    }

    function fix() {
        // Исправление консоли
        console.log('Fixing console...');
    }

    if (window.appready) {
        setTimeout(main, 4000);
        fix();
    } else {
        Lampa.Listener.follow('app', function(e) {
            if (e.type === 'ready') {
                setTimeout(main, 4000);
                fix();
            }
        });
    }
})();
