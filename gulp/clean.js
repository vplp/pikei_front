const clean = require('gulp-clean');

const { paths } = require('./constaints');
const { www, build } = paths;

module.exports = function ({ gulp, isProduction }) {
  /**
   * remove old ./src/www and ./build
   */
  gulp.task('clean:old-builds', () =>
    gulp.src([`${build.root}/*`, `${www.root}/*`], { allowEmpty: true }).pipe(
      clean({
        force: false,
      }),
    ),
  );
};
