const rewireMobX = require('react-app-rewire-mobx');
const {injectBabelPlugin} = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');
const path = require('path');

function overrideEslintOptions(options) {
  options.rules = {"react/no-deprecated": 0} // @TODO TEMPORARY, to silence proptypes warnings
  return options;
}

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  // use the MobX rewire
  config = rewireMobX(config,env);
  config = injectBabelPlugin('transform-export-extensions', config);
  config.resolve = {
      alias: {
          "~": path.resolve(__dirname, 'src/')
      }
  };
  config = rewireEslint(config, env, overrideEslintOptions);
  return config;
}
