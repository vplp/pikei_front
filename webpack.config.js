const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  context: `${__dirname}/src/js/`,
  cache: true,
  devtool: false,
  entry: {
    app: './main.js',
  },
  output: {
    filename: '[name].js',
  },
  resolve: {
    alias: {
      vue: require.resolve('vue/dist/vue.esm.js'),
      '@server': `${__dirname}/src/server`,
      '@js': `${__dirname}/src/js`,
      '@vue': `${__dirname}/src/vue`,
      '@modules': `${__dirname}/src/modules`,
      '@vendor': `${__dirname}/src/vendor`,
    },
    modules: [`${__dirname}/node_modules/`],
    extensions: ['.js'],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
          },
        },
      },

      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },

      // это правило будет применяться к обычным файлам `.scss`
      // А ТАКЖЕ к секциям `<style lang="scss">` в файлах `.vue`
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false,
              esModule: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: `
                @import './src/scss/utils';
              `,
            },
          },
        ],
      },
      {
        test: /\.(js|vue)$/,
        enforce: 'pre',
        exclude: /(node_modules|vendor)/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|vendor)/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          presets: [
            [
              '@babel/preset-env',
            ],
          ],
          plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-transform-runtime',
            'syntax-async-functions',
          ],
        },
      },
    ],
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        // vendor: {
        //   test: ({ resource }) => {
        //     return (
        //       resource &&
        //       !resource.includes(`${path.sep}core-js${path.sep}`) &&
        //       (resource.includes(`${path.sep}node_modules${path.sep}`) ||
        //         resource.includes(`${path.sep}vendor${path.sep}`))
        //     );
        //   },
        //   chunks: ({ name }) => name !== 'es6-polyfills',
        //   name: 'vendor',
        //   priority: -10,
        //   reuseExistingChunk: true,
        // },
      },
    },
    minimizer: [new TerserPlugin()],
  },

  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new VueLoaderPlugin(),
  ],
};
