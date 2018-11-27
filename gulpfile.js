const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');

gulp.task('clean', () => (
  gulp.src('dist', {read: false})
    .pipe(clean())
));

gulp.task('build', () => (
  gulp.src('src/angularjs-store.js')
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(gulp.dest('dist'))
));

gulp.task('default', gulp.series('clean', 'build'));
