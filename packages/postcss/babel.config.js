const path = require('path');

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        root: [path.resolve(__dirname)],
        alias: {
          config: './config',
          components: './components',
        },
      },
    ],
  ],
  presets: [
    '@irvingjs/irving',
  ],
};