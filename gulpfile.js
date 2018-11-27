const gulp = require('gulp');
const babel = require('gulp-babel');
const mocha = require('gulp-mocha');

gulp.task('build', () => (
  gulp.src('src/angularjs-store.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulp.dest('dist/'))
));

gulp.task('test', () => (
  gulp.src('./test/**.*.js')
    .pipe(mocha())
    .on('error', function (err) {
      console.log(err.toString());
      this.emit('end');
    })
));

gulp.task('watch', () => {
  gulp.watch(
    ['./src/**/*.js', './test/**/*.js'],
    gulp.series('build', 'test')
  );
});

gulp.task('default', gulp.series('build', 'test', 'watch'));
