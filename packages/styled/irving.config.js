import getAppTemplateVars from './server/getAppTemplateVars';
import * as variables from './variables';

// Export config
export default {
  name: 'styled',
  getAppTemplateVars,
  cssVariables: variables,
  styleguideConfig: './config/styleguide.config.js',
};
