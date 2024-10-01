import '../src/www/css/vendor.css'
import '../src/www/css/app.css'
// import '../src/www/js/app.js'

(function() {
  const po = document.createElement('script');
  po.type = 'text/javascript';
  po.async = true;
  po.src = '/js/app.js';
  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(po, s);
})();

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
