const path = require('path');
const { appRoot } = require('../paths');

/**
 * Get the context specific alias configuration.
 *
 * @param {string} context The configuration context
 * @returns {object} An alias configuration value.
 */
module.exports = function getAlias(context) {
  switch (context) {
    case 'development_server':
    case 'production_server':
      return {};

    case 'development_client':
      // Use the app version of these packages to prevent duplicate react errors with npm link
      return {
        'react-dom': path.join(appRoot, './node_modules/react-dom'),
        react: path.join(appRoot, './node_modules/react'),
        'react-redux': path.join(appRoot, './node_modules/react-redux'),
        'styled-components': path.join(
          appRoot,
          './node_modules/styled-components'
        ),
      };

    case 'production_client':
      return {};

    default:
      throw new Error(`Unknown configuration context ${context}`);
  }
};
