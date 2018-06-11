const { serverBuild, appBuild, publicPath } = require('../paths');

module.exports = (mode, opEnv) => {
  switch (`${mode}_${opEnv}`) {
    case 'production_server':
    case 'development_server':
      return {
        path: serverBuild,
        filename: '[name].bundle.js',
        libraryTarget: 'commonjs2',
      };

    case 'production_client':
      return {
        path: appBuild,
        publicPath,
        filename: '[name].[chunkhash:8].bundle.js',
        chunkFilename: '[name].[chunkhash:8].chunk.js',
      };

    case 'development_client':
      return {
        path: appBuild,
        publicPath: `${host}/`,
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
      };

    default:
      throw new Error('Unknown configuration environment');
  }
};
