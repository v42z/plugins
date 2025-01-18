(function () {
    'use strict';
    Lampa.Platform.tv();

    (function () {
        // Функция для создания замыкания с одноразовым вызовом функции
        function createOnceWrapper() {
            let called = true;
            return function (context, func) {
                let wrapper = called ? function () {
                    if (func) {
                        let result = func.apply(context, arguments);
                        func = null;
                        return result;
                    }
                } : function () {};
                called = false;
                return wrapper;
            };
        }

        const wrapOnce1 = createOnceWrapper();
        const wrapOnce2 = createOnceWrapper();

        // Удаление рекламы при определённых действиях
        function handleToggle(event) {
            if (event.name === 'select') {
                setTimeout(() => {
                    if (Lampa.Activity.active().component === 'full' && document.querySelector(".ad-server")) {
                        $(".ad-server").remove();
                    }
                    if (Lampa.Activity.active().component === "modss_online") {
                        $(".selectbox-item--icon").remove();
                    }
                }, 20);
            }
        }

        // Удаление элементов блокировки и статуса аккаунта
        function removeLockAndStatus() {
            setTimeout(() => {
                $(".selectbox-item__lock").parent().css('display', 'none');
                if (!$("[data-name=\"account_use\"]").length) {
                    $("div > span:contains(\"Статус\")").parent().remove();
                }
            }, 10);
        }

        // Обработка изменений в DOM для удаления рекламы
        function setupDomMutationListener() {
            let cardCheck = 0;
            document.addEventListener("DOMSubtreeModified", () => {
                const cards = document.getElementsByClassName("card");
                if (cards.length > 0 && cardCheck === 0) {
                    cardCheck = 1;
                    removeLockAndStatus();
                    setTimeout(() => cardCheck = 0, 500);
                }
            }, false);
        }

        // Запрет вывода сообщений в консоль и скрытие кнопки подписки
        function modifyConsoleAndHideSubscribeButton() {
            const wrapper = wrapOnce1(this, () => {
                return wrapper.toString().search("(((.+)+)+)+$").toString().constructor(wrapper).search("(((.+)+)+)+$");
            });
            wrapper();

            const consoleWrapper = wrapOnce2(this, () => {
                const getGlobal = () => {
                    try {
                        return Function("return (function() {}.constructor(\"return this\")( ));")();
                    } catch (_) {
                        return window;
                    }
                };
                const global = getGlobal();
                const consoleObj = global.console = global.console || {};
                const methods = ['log', 'warn', 'info', 'error', 'exception', 'table', 'trace'];
                methods.forEach(method => {
                    const bind = wrapOnce2.constructor.prototype.bind(wrapOnce2);
                    const originalMethod = consoleObj[method] || bind;
                    bind.__proto__ = wrapOnce2.bind(wrapOnce2);
                    bind.toString = originalMethod.toString.bind(originalMethod);
                    consoleObj[method] = bind;
                });
            });
            consoleWrapper();

            const style = document.createElement("style");
            style.innerHTML = ".button--subscribe { display: none; }";
            document.body.appendChild(style);

            Lampa.Listener.follow('full', event => {
                if (event.type === 'build' && event.name === 'discuss') {
                    setTimeout(() => {
                        $(".full-reviews").parent().parent().parent().parent().remove();
                    }, 100);
                }
            });

            $(document).ready(() => {
                const now = new Date();
                localStorage.setItem("region", JSON.stringify({ code: "uk", time: now.getTime() }));
            });

            $("[data-action='tv']").on("hover:enter hover:click hover:touch", () => {
                const adBotInterval = setInterval(() => {
                    if (document.querySelector('.ad-bot')) {
                        $('.ad-bot').remove();
                        clearInterval(adBotInterval);
                        setTimeout(() => Lampa.Controller.toggle('content'), 0);
                    }
                }, 50);

                const textboxInterval = setInterval(() => {
                    if (document.querySelector(".card__textbox")) {
                        $(".card__textbox").parent().parent().remove();
                        clearInterval(textboxInterval);
                    }
                }, 50);
            });

            setTimeout(() => {
                $(".open--feed, .open--premium, .open--notice").remove();
                if ($(".icon--blink").length) {
                    $(".icon--blink").remove();
                }
            }, 1000);

            Lampa.Settings.listener.follow("open", event => {
                if (event.name === "account") {
                    setTimeout(() => {
                        $(".settings--account-premium").remove();
                        $("div > span:contains(\"CUB Premium\")").remove();
                    }, 0);
                }
                if (event.name === "server" && document.querySelector('.ad-server')) {
                    $(".ad-server").remove();
                }
            });

            Lampa.Listener.follow('full', event => {
                if (event.type === 'complite') {
                    $(".button--book").on("hover:enter", removeLockAndStatus);
                }
            });

            Lampa.Storage.listener.follow("change", event => {
                if (event.name === 'activity' && Lampa.Activity.active().component === 'bookmarks') {
                    $(".register:nth-child(4), .register:nth-child(5), .register:nth-child(6), .register:nth-child(7), .register:nth-child(8)").hide();
                }
                setTimeout(setupDomMutationListener, 200);
            });
        }

        if (window.appready) {
            modifyConsoleAndHideSubscribeButton();
            setupDomMutationListener();
            handleToggle();
        } else {
            Lampa.Listener.follow("app", event => {
                if (event.type === 'ready') {
                    modifyConsoleAndHideSubscribeButton();
                    setupDomMutationListener();
                    handleToggle();
                    $("[data-action=feed], [data-action=subscribes], [data-action=myperson]").eq(0).remove();
                }
            });
        }
    })();
})();