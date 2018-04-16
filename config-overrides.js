const path = require('path');

const rewireParity = require('react-app-rewire-parity');

module.exports = (config) => {
  config = rewireParity(config);

  config.resolve.alias['~'] = path.resolve(__dirname, 'src/');

  return config;
};
