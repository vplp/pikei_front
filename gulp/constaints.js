const src = './src';
const dist = './src/www';

const paths = {
  build: {
    root: './build',
  },
  src: {
    root: src,
    pug: `${src}/pug`,
    scss: `${src}/scss`,
    js: `${src}/js`,
    noBundleJS: `${src}/js/no-bundle`,
    ajax: `${src}/ajax`,
    images: `${src}/i`,
    sprite: `${src}/i/[_sprite]*`,
    fonts: `${src}/fonts`,
    favicons: `${src}/favicons`,
    media: `${src}/media`,
    vue: `${src}/vue`,
    server: `${src}/server`,
    collections: `${src}/pug/collections`,
  },
  www: {
    root: dist,
    ajax: `${dist}/ajax`,
    images: `${dist}/i`,
    fonts: `${dist}/fonts`,
    media: `${dist}/media`,
    js: `${dist}/js`,
    css: `${dist}/css`,
  },
};

module.exports = { paths };
