const gulp = require('gulp');

const bundleESM = require('./functions/bundle-esm');

module.exports = function registerBuildESMTasks(config) {
  gulp.task('esm:build', () => bundleESM(config));
};
