// const rewireMobX = require('react-app-rewire-mobx');
const {injectBabelPlugin} = require('react-app-rewired');

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  // use the MobX rewire
  // config = rewireMobX(config,env);
  config = injectBabelPlugin('transform-export-extensions', config);
  return config;
}