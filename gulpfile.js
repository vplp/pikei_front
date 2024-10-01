const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const args = require('minimist')(process.argv.slice(2));

const hasTunnel = args.tunnel || false;
const isProduction = args.production || args.isProduction || args.P || false

require('./gulp/scss')({ gulp, browserSync, isProduction });
require('./gulp/copy')({ gulp, browserSync });
require('./gulp/pug')({ gulp, browserSync, isProduction });
require('./gulp/webpack')({ gulp, browserSync, isProduction });
require('./gulp/svg-sprite')({ gulp });
require('./gulp/clean')({ gulp, isProduction });
require('./gulp/livereload')({ gulp, browserSync, hasTunnel });
require('./gulp/file-versions')({ gulp, isProduction });

/**
 * build
 */
gulp.task(
  'default',
  gulp.series(
    'clean:old-builds',
    'pug:reload-config',
    gulp.parallel(
      'copy:media',
      'copy:json',
      'copy:nobundle-js',
      'copy:favicons',
      'copy:images',
      'copy:fonts',
      'svg-sprite',
      'pug',
      'scss',
      'scss:lint',
      'scss:vue-lint',
      'scss:vendor',
      'webpack',
    ),
    'copy',
    'file-versions',
    'gzip',
  ),
);

/**
 * build + watch + server
 */
gulp.task(
  'serve',
  gulp.series(
    'pug:reload-config',
    gulp.parallel(
      'copy:media',
      'copy:json',
      'copy:nobundle-js',
      'copy:favicons',
      'copy:images',
      'copy:fonts',
      'svg-sprite',
      // 'svg-other-sprites',
      'pug',
      'scss',
      'scss:lint',
      'scss:vue-lint',
      'scss:vendor',
      'webpack',
    ),
    gulp.parallel('watch', 'browserSyncServer'),
  ),
);
