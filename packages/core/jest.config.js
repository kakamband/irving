const baseConfig = require('../../jest.config.base.js');

module.exports = {
  ...baseConfig,
  name: '@irving/core',
  displayName: '@irving/core',
  setupFiles: ['<rootDir>/config/jest.setup.js'],
};