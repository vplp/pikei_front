const replace = require('gulp-replace');
const plumber = require('gulp-plumber');

const { paths } = require('./constaints');
const { build } = paths;

module.exports = function ({ gulp }) {
  /**
   * adding versions for .css .js
   */
  gulp.task('file-versions', () => {
    const now = Date.now();

    require('fs')
      .writeFileSync(`${build.root}/.frontend.env`, `VERSION=${now}`);

    return gulp
      .src(`${build.root}/*.html`)
      .pipe(plumber())
      .pipe(replace('css/vendor.css"', `css/vendor.css?v=${now}"`))
      .pipe(replace('css/app.css"', `css/app.css?v=${now}"`))
      .pipe(replace('js/vendor.js"', `js/vendor.js?v=${now}"`))
      .pipe(replace('js/app.js"', `js/app.js?v=${now}"`))
      .pipe(gulp.dest(build.root));
  });
};
