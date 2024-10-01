/** @type { import('@storybook/html-webpack5').StorybookConfig } */
const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: 'storypug',
      options: {
        babel: true, //use babel-loader
      },
    },
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {},
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Summary',
  },
  staticDirs: [
    { from: '../src/www/i/', to: '/i/' },
    { from: '../src/www/fonts/', to: '/fonts/' },
    { from: '../src/www/js/', to: '/js/' },
    { from: '../src/www/css/', to: '/css/' },
  ],
}
export default config
