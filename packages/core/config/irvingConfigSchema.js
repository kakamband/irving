// I realize this isn't actually a schema—it will be eventually.
module.exports = {
  name: '',
  babelConfig: [() => {}],
  envAllowlist: [() => []],
  cacheService: () => {},
  startServer: () => {},
  customizeRedirect: [() => {}],
  customizeServer: [() => {}],
  customizeDevServer: [() => {}],
  customizeProdServer: [() => {}],
  logService: () => {},
  defaultState: [() => {}],
  getAppTemplateVars: [() => {}],
  getErrorTemplateVars: [() => {}],
  monitorService: () => {},
  packages: [],
  postcssConfig: [() => {}],
  exportServer: [() => {}],
  proxyPassthrough: [() => []],
  reducers: [() => {}],
  webpackConfig: [() => {}],
  sagas: [() => {}],
  stylelintConfig: [() => {}],
  styleguideConfig: [() => {}],
  styleguideSetup: [],
  trailingSlashDenylist: [],
};
