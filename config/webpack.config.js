const nodeExternals = require('webpack-node-externals');
const getConfig = require('./webpack');

module.exports = (env, argv) => {
  const { mode } = argv.mode;
  const server = getConfig(mode, 'server');
  const client = getConfig(mode, 'client');
  return [
    {
      name: 'client',
      mode,
      entry: client.getEntry(),
      output: client.getOutput(),
      module: {
        rules: client.getRules(),
      },
      plugins: client.getPlugins(),
      optimization: {
        splitChunks: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
        },
        runtimeChunk: true,
      },
    },
    {
      name: 'server',
      mode,
      devtool: 'sourcemap',
      target: 'node',
      // Quiet bundle size errors, as they are not applicable for code executed in NodeJS.
      performance: {
        hints: false,
      },
      // Allow references to vendor css, so we can include them in our bundle.
      externals: [nodeExternals({
        whitelist: [/\.css$/],
      })],
      entry: server.getEntry(),
      output: server.getOutput(),
      module: {
        rules: server.getRules(),
      },
      plugins: server.getPlugins(),
    },
  ];
};
