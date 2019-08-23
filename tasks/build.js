const gulp = require('gulp');

const registerBuildCJSTasks = require('./build-cjs');
const registerBuildUMDTasks = require('./build-umd');
const registerBuildESMTasks = require('./build-esm');

module.exports = function registerBuildTask(config) {
  registerBuildCJSTasks(config);
  registerBuildUMDTasks(config);
  registerBuildESMTasks(config);

  gulp.task('build', gulp.series('clean', gulp.parallel('cjs:build-production', 'umd:build-production', 'esm:build')));
};
