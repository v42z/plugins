// Полностью обработанный код из исходного файла
(function () {
    'use strict';
Lampa.Platform.tv();
    // Массив строк из функции _0x3a1f
    const stringArray = [
        'rKf5vgG', 'yvbnB1O', 'whLUvKG', 'r3rTyvu', 'u3DdvfK', 'rg9MD0C',
        'Bvv6DNu', 's3P2A3a', 'EKL0tNe', 'rxnzs04', 'zg1sEfa', 'tg1qtLu',
        'DMX1DNq', 'y2HHBMDL', 'B29R', 'yxf3wem', 'Chvtrvq', 'BLHVzxy',
        'lMjSywnRlwzYAq', 'DgjVEa', 'zxHJzxb0Aw9U', 'AeP6CuW', 'EerjuLq', 'DwT5AvC', 'CgvTrKC'
    ];

    // Функция _0x3c4e для расшифровки строк
    function decodeString(index) {
        const adjustedIndex = index - 0x2f0b; // Сдвиг индекса
        return stringArray[adjustedIndex] || null;
    }

    // Упрощённые функции с различными смещениями
    function decodeWithOffset1(param1) {
        return decodeString(param1 - 0x1a6);
    }

    function decodeWithOffset2(param2) {
        return decodeString(param2 - 0x52);
    }

    function decodeWithOffset3(param3) {
        return decodeString(param3 - -0x3e0);
    }

    // Пример вызова функций
    console.log(decodeWithOffset1(0x500)); // Пример вызова с первым смещением
    console.log(decodeWithOffset2(0x200)); // Пример вызова со вторым смещением
    console.log(decodeWithOffset3(0x800)); // Пример вызова с третьим смещением

})();
