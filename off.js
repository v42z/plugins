// Упрощённый код с расшифровкой строк
(function () {
    'use strict';

    // Генерация массива строк
    const stringArray = [
        'rKf5vgG', 'yvbnB1O', 'whLUvKG', 'r3rTyvu', 'u3DdvfK', 'rg9MD0C', 'Bvv6DNu', 's3P2A3a', 'EKL0tNe', 'rxnzs04',
        'zg1sEfa', 'tg1qtLu', 'DMX1DNq', 'y2HHBMDL', 'B29R', 'yxf3wem', 'Chvtrvq', 'BLHVzxy',
        'lMjSywnRlwzYAq', 'DgjVEa', 'zxHJzxb0Aw9U', 'AeP6CuW', 'EerjuLq', 'DwT5AvC', 'CgvTrKC'
    ];

    // Расшифровка строки по индексу
    function decodeString(index) {
        const adjustedIndex = index - (0x21cf + 0xe99 - 0x2f0b); // Смещение индекса
        if (adjustedIndex >= 0 && adjustedIndex < stringArray.length) {
            return stringArray[adjustedIndex];
        }
        return null;
    }

    // Вспомогательные функции для работы с индексами
    function helper1(param1, param2) {
        return decodeString(param1 - 0x1a6);
    }

    function helper2(param1, param2) {
        return decodeString(param2 - 0x52);
    }

    function helper3(param1, param2) {
        return decodeString(param1 - -0x3e0);
    }

    // Пример использования
    console.log(helper1(0x400, 0)); // Использует первый индекс
    console.log(helper2(0, 0x100)); // Использует второй индекс
    console.log(helper3(0x500, 0)); // Использует третий индекс

})();
