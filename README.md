# DNP

## Структура

### src/app

1. Содержит верхнеуровневую логику (index.html, layout, providers)
2. Ничего не экспортирует

### src/lib

1. Аналог папки 'helpers'
2. Может содержать **только** папки
3. На втором уровне обязан иметь index файл
4. Папки классифицируются по:
    1. логике (auth, api, error)
    2. типу данных (dropdownOptions)
    3. библиотекам (i18n, toast)

### src/pages

1. Старницы следуют паттерну DDD, то есть урлу `hostname.ru/entity/:id/tree` будет соответствовать вложенность папок `src/entity/id/tree`

### src/shared

1. Содержит инстансы (axios, dayjs, i18n, react-query)
2. Содержит конфиги (routes)

### src/utils

1. Ничего не знает о проекте, т.е. файлы папки utils могут импортировать только смежные с собой файлы и папки, не выходящие за пределы папки utils
2. На втором уровне обязан иметь index файл
3. Папки классифицируются по:
    1. логике (dom, error)
    2. типу данных (string, number, list)

### package/types

1. Каждый тип хранится в отдельном файле
2. Не может содержать index file

### package/widgets

1. Содержит в себе составные части компонента. Например компонент Header мог бы хранить в этой папке Logo, Links, ThemeDropdown, LogoutButton

### package/variants

1. Содержит в себе вариации основного компонента. Например комопнент Button мог бы хранить в этой папке PrimaryButton, GhostButton, LinkButton

## Нейминг

### Преффикс

Для компонентов внутри папки используй префикс
1. `abstract` - `a-Component`, 
2. `ui` - `ui-Component`, 
3. `entities/{entityName}` - `{entityName}-Component`, 
5. `widgets` - обозначается `w`. Например: `ui-Component-w-Widget`
6. `variants` - обозначается `v`. Например: `ui-Component-v-Variant`

## Theme

Некоторые компоненты имеют тему. Темы реализованы таким образом, чтобы компонент можно было легко перенести на другой проект.

/* в разработке */

## Нейминг CSS переменных

Структура: 
[prefix]-Component[-subComponent]_propertyName[--modificator]...[--modificator]
Например:
`Button_color` - цвет кнопки
`Button_bg--focus` - бэкграунд кнопки с фокусом
`user-Button_bg--active` - бэкграунд активной кнопки для сущности `user`
`user-Button-icon_color--active` - бэкграунд подкомпонента `icon` активной кнопки для сущности `user`
`user-Button-icon_color--active--error` - бэкграунд подкомпонента `icon` активной кнопки для сущности `user` c ошибкой
