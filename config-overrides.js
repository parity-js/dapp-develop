const path = require('path');

const rewireParity = require('react-app-rewire-parity');

module.exports = (config) => {
  config = rewireParity(config, {
    htmlScriptUris: [ '/parity-utils/inject.js' ]
  });

  config.resolve.alias['~'] = path.resolve(__dirname, 'src/');

  return config;
};
