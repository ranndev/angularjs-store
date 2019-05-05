const CleanWebpackPlugin = require('clean-webpack-plugin');

/**
 * Base build configuration.
 *
 * @type {import('webpack').Configuration}
 */
const baseConfig = {
  entry: { 'angularjs-store': './src/angularjs-store.ts' },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
    library: 'NgStore',
    libraryExport: 'default',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
    }],
  },
  externals: ['angular'],
  plugins: [
    new CleanWebpackPlugin(),
  ],
};

/**
 * Development build configuration.
 *
 * @type {import('webpack').Configuration}
 */
const devConfig = {
  ...baseConfig,
  mode: 'development',
  watch: true,
};

/**
 * Production build configuration.
 *
 * @type {import('webpack').Configuration}
 */
const prodConfig = {
  ...baseConfig,
  mode: 'production',
  output: {
    ...baseConfig.output,
    filename: '[name].min.js',
  },
};

module.exports = (env) => {
  switch (env) {
    case 'production': return prodConfig;
    default: return devConfig;
  }
};
