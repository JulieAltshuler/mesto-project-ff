module.exports = {
  rules: {
    'color-no-invalid-hex': true, // Запрещает использование недопустимых значений цвета в формате HEX
    'value-keyword-case': ['lower', { camelCaseSvgKeywords: true }], // Проверяет регистр ключевых слов в значениях свойств
    'property-no-unknown': true, // Запрещает использование неизвестных свойств
    'declaration-block-no-duplicate-properties': true, // Запрещает дублирование свойств в блоке объявлений
    'declaration-block-no-shorthand-property-overrides': true, // Запрещает использование сокращённых свойств, которые переопределяют другие свойства в блоке объявлений
    'media-feature-name-no-unknown': true, // Запрещает использование неизвестных названий медиа-функций в медиа-запросах
    'comment-no-empty': true, // Запрещает пустые комментарии
    'no-descending-specificity': true, // Запрещает использование стилей с уменьшающейся специфичностью
    'no-duplicate-selectors': true, // Запрещает дублирование селекторов
    'no-invalid-position-at-import-rule': true, // Запрещает использование недопустимой позиции @import
    'alpha-value-notation': 'number', // Устанавливает стиль записи альфа-канала (прозрачности)
    'color-function-notation': 'modern', // Устанавливает стиль записи цветовых функций
    'color-hex-length': 'short', // Устанавливает предпочтительную длину записи цвета в формате HEX
    'length-zero-no-unit': true, // Запрещает использование единиц измерения для нулевых значений
    'font-family-name-quotes': 'always-where-required', // Устанавливает стиль использования кавычек в именах семейств шрифтов
    'function-url-quotes': 'never', // Устанавливает стиль использования кавычек в URL функций
    'import-notation': 'url', // Устанавливает стиль записи импорта
    'shorthand-property-no-redundant-values': true, // Запрещает использование избыточных значений в сокращённых свойствах
    'declaration-no-important': true, // Запрещает использование важности (!important) в объявлениях
    'declaration-block-single-line-max-declarations': 1, // Устанавливает максимальное количество объявлений в одной строке блока объявлений
    'no-unknown-animations': true, // Запрещает использование неизвестных анимаций
    'selector-type-case': 'lower', // Устанавливает регистр записи типа селектора (например, тега)
    'rule-empty-line-before': 'always', // Устанавливает наличие пустой строки перед правилом
    'at-rule-empty-line-before': 'always', // Устанавливает наличие пустой строки перед правилом At-команды
    'selector-class-pattern': null, // Паттерн для проверки классов селекторов. Здесь установлено значение null, что означает отсутствие проверки
    'font-family-name-quotes': 'always-where-recommended', // Устанавливает стиль использования кавычек в именах семейств шрифтов
  },
};
