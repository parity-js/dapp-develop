var cfg = require('eslint-config-parity');
cfg['rules']['import/no-webpack-loader-syntax'] = ['warn'];
cfg['rules']['react/no-unused-prop-types'] = ['warn'];
cfg['rules']['prefer-promise-reject-errors'] = ['warn'];

module.exports = cfg;
