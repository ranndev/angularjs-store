const path = require('path');
const webpack = require('webpack');
const gulp = require('gulp');
const clean = require('gulp-clean');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require('./webpack.common');

gulp.task('clean', () => (
  gulp.src('./lib', { read: false, allowEmpty: true })
    .pipe(clean({ force: true }))
));

const devConfig = Object.assign({}, config, {
  entry: './src/angularjs-store.js',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'angularjs-store.js',
    library: 'NgStore',
    libraryTarget: 'umd',
  },
  resolve: { modules: ['node_modules'] },
  devtool: 'source-map',
});

gulp.task('build:uncompressed', (done) => {
  webpack(devConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      done(err);
    }

    done();
  });
});

const prodConfig = Object.assign({}, devConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'angularjs-store.min.js',
    library: 'NgStore',
    libraryTarget: 'umd',
  },
  optimization: {
    minimizer: [new UglifyJsPlugin({
      sourceMap: true,
      uglifyOptions: {
        mangle: { reserved: ['NgStore'] },
      },
    })],
  },
});

gulp.task('build:compressed', (done) => {
  webpack(prodConfig, (err, stats) => {
    if (err || stats.hasErrors()) {
      done(err);
    }

    done();
  });
});

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel(
    'build:compressed',
    'build:uncompressed',
  ),
));
