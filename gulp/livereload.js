const { paths } = require('./constaints');
const { www, src } = paths;

module.exports = function ({ gulp, browserSync, hasTunnel = false }) {
  /**
   * browserSyncInstance server
   */
  gulp.task('browserSyncServer', () => {
    browserSync.init({
      server: www.root,
      notify: false,
      startPath: '/main.html',
      ghostMode: false,
      online: true,
      tunnel: hasTunnel,
    });
  });

  /**
   * chokidar options
   * @type {{awaitWriteFinish: {stabilityThreshold: number, pollInterval: number, interval: number, binaryInterval: number, ignored: string}}}
   */
  const watchOpt = {
    delay: 500,
    // awaitWriteFinish: false,
    // interval: 400,
    // binaryInterval: 600,
    ignored: ['*.txt', /(^|[\/\\])\../],
  };

  /**
   * files watch
   */
  gulp.task('watch', () => {
    gulp.watch(
      [
        `${src.js}/**/*.js`,
        `${src.vue}/**/*.(js|vue)`,
        `${src.server}/**/*.js`,
        `!${src.noBundleJS}/**/*.js`,
        `${src.root}/api/**`,
        `${src.collections}/**/*.js`,
      ],
      gulp.series('webpack'),
      watchOpt,
    );
    gulp.watch(
      './src/pug/config.json',
      gulp.series('pug:reload-config', 'pug'),
      watchOpt,
    );
    gulp.watch(`${src.pug}/**/*.pug`, gulp.series('pug'), watchOpt);
    gulp.watch(
      [`${src.scss}/vendor.scss`, `${src.scss}/vendor/*.css`],
      gulp.series('scss:vendor'),
      watchOpt,
    );
    gulp.watch(
      [
        `${src.scss}/*.scss`,
        `${src.scss}/layout/**/*.scss`,
        `${src.scss}/utils/*.scss`,
        `${src.scss}/global/*.scss`,
        `${src.scss}/modules/**/*.scss`,
      ],
      gulp.series('scss', 'scss:lint'),
      watchOpt,
    );
    gulp.watch(
      [`${src.vue}/**/*.vue`],
      gulp.series('scss:vue-lint'),
      watchOpt,
    );
    gulp.watch(
      `${src.noBundleJS}/**/*.js`,
      gulp.series('copy:nobundle-js'),
      watchOpt,
    );
    gulp.watch(`${src.js}/**/*.json`, gulp.series('copy:json'), watchOpt);
    gulp.watch(`${src.media}/**`, gulp.series('copy:media'), watchOpt);
    gulp.watch(`${src.fonts}/**`, gulp.series('copy:fonts'), watchOpt);
    gulp.watch(
      [
        `${src.images}/**/*.jpg`,
        `${src.images}/**/*.png`,
        `${src.images}/**/*.webp`,
        `${src.images}/**/*.svg`,
        `!${src.sprite}/**`,
      ],
      gulp.series('copy:images'),
      watchOpt,
    );
    gulp.watch(
      `${src.sprite}/*.svg`,
      gulp.series('svg-sprite', 'pug'),
      watchOpt,
    );
  });
};
