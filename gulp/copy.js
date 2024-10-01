const changed = require('gulp-changed');
const plumber = require('gulp-plumber');
const gzip = require('gulp-gzip');
const { paths } = require('./constaints');
const { www, src, build } = paths;

module.exports = function ({ gulp, browserSync }) {
  /**
   * copy build from ./src/www to ./build
   */
  gulp.task('copy', () =>
    gulp.src(`${www.root}/**`, { base: www.root }).pipe(gulp.dest(build.root)),
  );

  /**
   * images copy
   */
  gulp.task('copy:images', () =>
    gulp
      .src(`${src.images}/**`)
      .pipe(plumber())
      .pipe(changed(www.images))
      .pipe(gulp.dest(www.images))
      .pipe(browserSync.stream({ once: true })),
  );

  /**
   * fonts copy
   */
  gulp.task('copy:fonts', () =>
    gulp
      .src(`${src.fonts}/**`)
      .pipe(plumber())
      .pipe(changed(www.fonts))
      .pipe(gulp.dest(www.fonts))
      .pipe(browserSync.stream({ once: true })),
  );

  /**
   * copy favicons to root path
   */
  gulp.task('copy:favicons', () =>
    gulp
      .src(`${src.favicons}/**`)
      .pipe(plumber())
      .pipe(changed(www.root))
      .pipe(gulp.dest(www.root)),
  );

  /**
   * copy media files (video/pdf/doc etc)
   */
  gulp.task('copy:media', () =>
    gulp
      .src(`${src.media}/**`)
      .pipe(plumber())
      .pipe(changed(www.media))
      .pipe(gulp.dest(www.media))
      .pipe(browserSync.stream({ once: true })),
  );

  /**
   * json files copy
   */
  gulp.task('copy:json', () =>
    gulp.src(`${src.js}/**/*.json`).pipe(plumber()).pipe(gulp.dest(www.js)),
  );

  /**
   * copy not bundled scripts
   */
  gulp.task('copy:nobundle-js', () =>
    gulp
      .src(`${src.noBundleJS}/*.js`, {
        allowEmpty: true,
      })
      .pipe(plumber())
      .pipe(changed(www.js))
      .pipe(gulp.dest(www.js))
      .pipe(browserSync.stream({ once: true })),
  );

  /**
   * Static files gzip compression
   */
  const gzipFiles = 'css,js,woff,woff2,txt,wasm,glb,json';
  gulp.task('gzip', () =>
    gulp
      .src(`${build.root}/**/*.{${gzipFiles}}`, { base: '.' })
      .pipe(gzip({ skipGrowingFiles: true, gzipOptions: { level: 9 } }))
      .pipe(gulp.dest('./')),
  );
};
