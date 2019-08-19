#!/usr/bin/env node
/* eslint-disable global-require, max-len */
['react', 'react-dom'].forEach((dependency) => {
  try {
    // When 'npm link' is used it checks the clone location. Not the project.
    require.resolve(dependency);
  } catch (err) {
    console.warn(
      `The module '${dependency}' was not found. Irving requires that you include it in 'dependencies' of your 'package.json'. To add it, run 'npm install --save ${dependency}'`
    );
  }
});

const defaultCommand = 'dev';
const commandMap = {
  build: () => {
    process.env.NODE_ENV = 'production';
    require('../cli/build');
  },
  start: () => {
    process.env.NODE_ENV = 'production';
    require('../cli/start');
  },
  dev: () => {
    process.env.NODE_ENV = 'development';
    require('../cli/dev');
  }
};
const commands = Object.keys(commandMap);

if (process.argv && Array.isArray(process.argv)) {
  const command = process.argv.find((arg) => {
    if (commands.find((command) => arg === command)) {
      return true;
    }

    return false;
  });

  if (commandMap[command]) {
    commandMap[command]();
  }
}
/* eslint-enable */
