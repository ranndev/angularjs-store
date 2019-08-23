const gulp = require('gulp');

const bundleUMD = require('./functions/bundle-umd');

module.exports = function registerBuildUMDTasks(config) {
  gulp.task('umd:bundle-development', () => bundleUMD(config));

  gulp.task('umd:bundle-production', () => bundleUMD(config, true));

  gulp.task('umd:build-development', gulp.series('umd:bundle-development'));

  gulp.task('umd:build-production', gulp.parallel('umd:bundle-development', 'umd:bundle-production'));
};
