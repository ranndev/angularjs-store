const config = require('./webpack.config');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = Object.assign(config, {
  mode: 'production',
  entry: './src/angularjs-store',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'angularjs-store.js',
  },
  plugins: [new CleanWebpackPlugin(['dist'])],
});
