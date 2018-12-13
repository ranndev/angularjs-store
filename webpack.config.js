const path = require('path');

module.exports = {
  mode: 'development',
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        'babel-loader',
        'eslint-loader',
      ],
    }],
  },
  resolve: {
    alias: {src: path.resolve(__dirname, 'src')},
    modules: ['node_modules'],
  },
};
