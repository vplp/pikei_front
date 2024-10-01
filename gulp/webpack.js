const plumber = require('gulp-plumber');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const webpackConfig = require('../webpack.config.js');

const { paths } = require('./constaints');
const { www, src } = paths;
// webpackConfig.devtool = 'eval-cheap-source-map'; // sourcemaps

module.exports = function ({ gulp, browserSync, isProduction }) {
  /**
   * dev webpack build (with sourcemaps)
   */
  gulp.task('webpack', () => {
    if (isProduction) {
      webpackConfig.devtool = false;
      webpackConfig.mode = 'production';
    } else {
      webpackConfig.devtool = 'eval-cheap-module-source-map';
      webpackConfig.mode = 'development';
    }

    return gulp
      .src(`${src.js}/main.js`)
      .pipe(plumber())
      .pipe(webpackStream(webpackConfig, webpack))
      .pipe(gulp.dest(www.js))
      .pipe(browserSync.stream());
  });
};
