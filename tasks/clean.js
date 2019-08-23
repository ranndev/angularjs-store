const gulp = require('gulp');
const clean = require('gulp-clean');

module.exports = function registerCleanTask(config) {
  gulp.task('clean', () => {
    return gulp.src(config.dist + '/*', { allowEmpty: true, read: false }).pipe(clean());
  });
};
