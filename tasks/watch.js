const gulp = require('gulp');

module.exports = function registerWatchTask(config) {
  gulp.task(
    'watch',
    gulp.series(
      'clean',
      gulp.parallel('cjs:build-development', 'umd:build-development', 'esm:build'),
      function watch() {
        gulp.watch(['./src/**/*.ts'], gulp.parallel('cjs:bundle-development', 'umd:build-development', 'esm:build'));
      },
    ),
  );
};
