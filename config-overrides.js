const rewireMobX = require('react-app-rewire-mobx');
const {injectBabelPlugin} = require('react-app-rewired');
const rewireEslint = require('react-app-rewire-eslint');
const path = require('path');
const injectCSSRules = require('react-app-rewire-parity/src/rewires/inject-css-rules');

function overrideEslintOptions(options) {
  options.rules = {"react/no-deprecated": 0} // @TODO TEMPORARY, to silence proptypes warnings
  options.rules["import/no-webpack-loader-syntax"] = 0; // For the raw imports in WriteContractStore
  return options;
}

module.exports = function override(config, env) {
  config = rewireMobX(config,env);
  config = injectBabelPlugin('transform-export-extensions', config);
  config.resolve = {
      alias: {
          "~": path.resolve(__dirname, 'src/')
      }
  };
  config = rewireEslint(config, env, overrideEslintOptions);
  config = injectCSSRules(config, env);
  console.log(JSON.stringify(config,null,2));
  
  return config;
}
