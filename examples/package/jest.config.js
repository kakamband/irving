const baseConfig = require('../../jest.config.base.js');

/**
 * Jest configuration for tests, if you write them.
 * This can (and should) use the base jest config at the root of the Irving repo.
 */
module.exports = {
  ...baseConfig,
  name: '@irvingjs/example-package',
  displayName: '@irvingjs/example-package',
  setupFiles: ['<rootDir>/config/jest.setup.js'],
};
