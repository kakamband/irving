const path = require('path');
const fs = require('fs');
const { getValueFromFiles } = require('./config/irving/getValueFromFiles');
const getServiceAliases = require('./config/irving/getServiceAliases');
const {
  buildContext,
} = require('./config/paths');
const aliases = require('./config/aliases');
const scopeDir = path.join(__dirname, '../');
const packageDirs = fs.readdirSync(scopeDir);
const packageRoots = ! packageDirs.length ? [] :
  packageDirs.map((dir) => path.join(scopeDir, dir));
const shimPath = path.join(
  buildContext,
  'node_modules/@irvingjs/core/utils/shimDom'
);

const config = {
  plugins: [
    [
      'module-resolver',
      {
        root: [
          buildContext,
          ...packageRoots,
        ],
        cwd: 'packagejson',
        alias: {
          ...getServiceAliases('node'),
          ...aliases,
        },
      },
    ],
    ['transform-globals', {
      require: {
        [shimPath]: {
          window: 'default',
        },
      },
    }],
    [
      'react-remove-properties',
      {
        properties: [
          'data-testid',
        ],
      },
    ],
  ],
  presets: [
    '@irvingjs/irving',
  ],
};

module.exports = getValueFromFiles(
  'config/babel.config.js',
  config,
  { base: buildContext }
);
