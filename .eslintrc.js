module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  env: {
    browser: true,
    es6: true
  },
  extends: ["plugin:vue/recommended", "plugin:prettier/recommended", "plugin:proposal/recommended", "plugin:storybook/recommended", "plugin:storybook/recommended"],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    Modernizr: true
  },
  plugins: ['vue']
};