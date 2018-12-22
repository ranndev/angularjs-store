/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./webpack.common');

module.exports = Object.assign(config, {
  entry: './demo/index',
  output: {
    path: path.resolve(__dirname, 'demo/build'),
    filename: 'index.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'demo'),
    watchContentBase: true,
    open: true,
  },
  module: {
    rules: [...config.module.rules, {
      test: /\.(sa|sc|c)ss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    }, {
      test: /\.html$/,
      use: ['html-loader'],
    }],
  },
  resolve: {
    alias: { lib: path.resolve(__dirname, 'lib') },
    modules: ['node_modules'],
    extensions: ['.js', '.scss'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
    new HtmlWebpackPlugin({
      template: './demo/index.html',
    }),
    new CleanWebpackPlugin(['demo/build']),
  ],
});
