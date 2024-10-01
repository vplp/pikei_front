const fs = require('fs');
const path = require('path');
const plumber = require('gulp-plumber');
const pug = require('gulp-pug');
const gulpif = require('gulp-if');
const prettyHtml = require('gulp-pretty-html');
const rename = require('gulp-rename');

const { paths } = require('./constaints');
const { www, src } = paths;

module.exports = function ({ gulp, browserSync, isProduction }) {
  let config = {
    basedir: src.pug,
  }; // JSON with config for pug

  /**
   * pug > html
   */
  gulp.task('pug', () =>
    gulp
      .src(`${src.pug}/views/**/*.pug`, { base: './src/pug/views/' })
      .pipe(plumber())
      .pipe(pug(config))
      .pipe(prettyHtml({
        max_preserve_newlines: 1
      }))
      .pipe(rename({ extname: '.html' }))
      .pipe(gulp.dest(www.root))
      .pipe(gulpif(!isProduction, browserSync.stream({ once: true }))),
  );

  gulp.task('pug:reload-config', async () => {
    config = {
      basedir: src.pug,
      data: Object.assign(
        {},
        JSON.parse(fs.readFileSync('./src/pug/config.json')),
        {
          collection: (module) => {
            const modulePath = path.join(`../src/pug/collections/`, module);
            delete require.cache[require.resolve(modulePath)];
            return require(modulePath);
          },
        },
      )
    };
  });
};
