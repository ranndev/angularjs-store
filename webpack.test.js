const nodeExternals = require('webpack-node-externals');
const config = require('./webpack.common.js');

module.exports = Object.assign(config, {
  target: 'node',
  externals: [nodeExternals()],
});
