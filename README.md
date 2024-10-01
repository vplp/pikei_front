## Как использовать

```bash
# Установить зависимости
$ yarn install

# Запуск сервера с сборкой проекта на localhost:3000
$ yarn dev

# Сборка в production режиме
$ yarn build

# Сборка в development режиме с mock сервером 
$ yarn serve

# Исправить error/warning в js, vue, scss, по отдельности или всё вместе
$ yarn fix:style
$ yarn fix:js
$ yarn fix
```

## [Storybook](https://storybook.js.org/)

```bash
# Установить зависимости
$ yarn install

# Запуск storybook на localhost:6006
$ yarn storybook

# Сборка storybook d директорию ./build/storybook
$ yarn storybook
```

## Gitlab CI
Для данного проекта активирован Gitlab CI для выгрузки сборки с веток dev, main, master на тестовый сервер.
После выполнения pipeline проект загружается на домен `https://ветка-адрес_проекта.paraweb.pw/`. Например push в main ветку проекта https://paraweb.space/html/website-tpl создаст сборку по адресу `https://main-website-tpl.paraweb.pw/`, а storybook будет доступен по адресу `https://main-website-tpl.paraweb.pw/storybook`

## Кодстайл

* JavaScript - [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) ([на русском](https://github.com/leonidlebedev/javascript-airbnb))
* SCSS - [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css) ([на русском](https://github.com/rtplv/airbnb-css-ru))

В проект подключены следующие правила линтеров:
 * [ESLint](https://eslint.org/) с [prettier/recommended](https://github.com/prettier/eslint-config-prettier)
 * [Stylelint](https://stylelint.io/) с [stylelint-config-standard](https://github.com/stylelint/stylelint-config-standard) standard config, [stylelint-config-recess-order](https://github.com/stormwarning/stylelint-config-recess-order) для переопределения порядка css свойств

## Спрайты
Для сборки спрайтов используется пакет [gulp-svg-sprite](https://www.npmjs.com/package/gulp-svg-sprite). Исходные svg размещаются в по пути`./src/i/sprite/**/*.svg`. Сам спрайт после сборки находится `./src/www/i/sprite.svg`. 
В HTML спрайты можно использовать как `<svg><use xlink:href="./i/sprite.svg#file-name"></use></svg>`. В CSS `background-image: url(../i/sprite.svg#file-name)` . Также спрайт может быть подключен pug примесью `+sprite('file-name')`

