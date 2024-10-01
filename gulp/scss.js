const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const cssnano = require('cssnano');
const postcss_scss = require('postcss-scss');
const postcss_html = require('postcss-html');
const dart_sass = require('@csstools/postcss-sass');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

const { paths } = require('./constaints');
const { www, src } = paths;

const postcssProcessors = [dart_sass(), require('autoprefixer')()];

const postcssLint = [
  require('stylelint')(),
  require('postcss-reporter')({ clearReportedMessages: true }),
];

module.exports = function ({ gulp, browserSync, isProduction }) {
  if (isProduction) {
    postcssProcessors.push(cssnano(({
      preset: 'default',
    })));
  }

  /**
   * postcss vendor
   */
  gulp.task('scss:vendor', () =>
    gulp
      .src(`${src.scss}/vendor.scss`)
      .pipe(plumber())
      .pipe(
        postcss([dart_sass], {
          syntax: postcss_scss,
        }),
      )
      .pipe(rename('vendor.css'))
      .pipe(gulp.dest(www.css))
      .pipe(browserSync.stream()),
  );

  /**
   * postcss app
   */
  gulp.task('scss', () =>
    gulp
      .src(`${src.scss}/app.scss`)
      .pipe(plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }))
      // .pipe(sourcemaps.init())
      .pipe(postcss(postcssProcessors, { syntax: postcss_scss }))
      .pipe(rename('app.css'))
      // .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(www.css))
      .pipe(browserSync.stream()),
  );

  gulp.task('scss:lint', () =>
    gulp
      .src([
        `${src.scss}/**/*.scss`,
        `!${src.scss}/app.scss`,
        `!${src.scss}/vendor.scss`,
      ])
      .pipe(postcss(postcssLint, { syntax: postcss_scss })),
  );

  gulp.task('scss:vue-lint', () =>
    gulp.src([`${src.vue}/**/*.vue`]).pipe(
      postcss(postcssLint, {
        syntax: postcss_html({ scss: postcss_scss }),
      }),
    ),
  );
};
