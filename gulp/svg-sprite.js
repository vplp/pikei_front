const svgSprite = require('gulp-svg-sprite');
const replace = require('gulp-replace');

const path = require('path');
const fs = require('fs');
const es = require('event-stream');

const { paths } = require('./constaints');
const { www, src } = paths;

module.exports = function ({ gulp }) {
  /**
   * Create a svg sprite from folders starting with 'sprite'
   * example:
   * './src/i/sprite/*.svg -> ./src/www/i/sprite.svg
   * './src/i/sprite-services/*.svg -> ./src/www/i/sprite-services.svg
   */
  gulp.task('svg-sprite', (callback) => {
    const streams = [];

    fs.readdirSync(src.images)
      /**
       * filter only directory
       */
      .filter((file) => {
        const filename = path.join(src.images, file);
        const isDirectory = fs.lstatSync(filename).isDirectory();

        return isDirectory;
      })
      /**
       * filter only sprite directory
       */
      .filter((directory) => {
        return directory.indexOf('sprite') === 0;
      })
      .forEach((directory) => {
        streams.push(
          gulp
            .src(`${src.images}/${directory}/*.svg`) // svg files for sprite
            .pipe(
              svgSprite({
                mode: {
                  stack: {
                    sprite: `../${directory}.svg`, // sprite file name
                  },
                },
              }),
            )
            .pipe(replace(/\sviewBox=".*?"/, '')),
        );
      });

    es.merge
      .apply(null, streams)
      .pipe(gulp.dest(www.images))
      .on('end', callback);
  });
};
