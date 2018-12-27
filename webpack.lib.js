/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require('./webpack.common');

module.exports = Object.assign(config, {
  mode: 'production',
  entry: './src/angularjs-store.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'angularjs-store.js',
    library: 'NgStore',
    libraryTarget: 'umd',
  },
  resolve: {
    modules: ['node_modules'],
  },
  plugins: [
    new CleanWebpackPlugin(['lib']),
  ],
  optimization: {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        mangle: { reserved: ['NgStore'] },
      },
    })],
  },
});
