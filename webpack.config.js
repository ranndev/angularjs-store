const path = require('path');

module.exports = {
  mode: 'development',
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {presets: ['@babel/preset-env']},
      }
    }]
  },
  resolve: {
    alias: {src: path.resolve(__dirname, 'src')},
    modules: ['node_modules'],
  },
};
