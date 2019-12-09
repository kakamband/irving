const path = require('path');
const {
  appRoot,
  irvingRoot,
} = require('@irvingjs/core/config/paths');
const webpackConfig = require('@irvingjs/core/config/webpack.config');
const aliases = require('@irvingjs/core/config/aliases');
const clientconfig = webpackConfig({}, { mode: process.env.NODE_ENV })
  .find((config) => 'client' === config.name);

module.exports = {
  title: 'Irving',
  require: [
    'core-js/stable',
    'regenerator-runtime/runtime',
  ],
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    Wrapper: path.join(__dirname, '../components/wrapper.js'),
  },
  styleguideDir: path.join(appRoot, 'styleguide'),
  webpackConfig: {
    ...clientconfig,
    // Get rid of splitChunks.
    optimization: {},
    // Recreate aliases as we can't use the same babel aliases for styleguide
    resolve: {
      alias: {
        ...clientconfig.resolve.alias,
        // Fix issue with acorn parser import.
        acorn: require.resolve('acorn/dist/acorn.js'),
        // Make all aliases absolute.
        ...Object.keys(aliases).reduce(
          (acc, alias) => (
            [...acc, path.join(irvingRoot, alias)]
          )
        ),
      },
    },
  },
};