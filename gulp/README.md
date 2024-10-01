## Gulp task list

Task name          | Description                                                      
:------------------|:----------------------------------
`scss` 	         | compile ./src/scss/app.scss to .css. We use [scss](https://sass-scss.ru/), and postcss for [autoprefixer](https://github.com/postcss/autoprefixer)
`scss:lint` 	| run stylelint for project scss files
`scss:vendor` 	| same as `scss` task, compile ./src/scss/vendor.scss to .css
`webpack`          | compile `./src/js/main.js` sources into bundle file
`copy`             | copy common files from `./src/www` path to `./build` path
`сopy:images`             | copy common files from `./src/i` path to `./src/www/i` path
`copy:fonts`             | copy common files from `./src/fonts` path to `./src/www/fonts` path
`copy:favicons`             | copy common files from `./src/favicons` path to `./src/www` path
`copy:media`             | copy common files from `./src/media` path to `./src/www/media` path
`copy:json`             | copy common files from `./src/js/json` path to `./src/www/js/` path
`copy:nobundle-js`             | copy common files from `./src/www` path to `./build` path
`svg-sprite`             | generate svg sprite from `./src/i/sprite/**/*.svg` to `./src/www/i/sprite.svg`
`pug`             | compile pug  templates
`serve`           | run dev-server powered by [BrowserSync](https://www.browsersync.io/)
`clean:old-builds`            | remove `./build` and `./src/www` folder
`file-versions`            | change versions for all `build/*.html` from `build/css/vendor.css`, `build/css/app.css`, `build/js/vendor.js`,  `build/js/app.js`
