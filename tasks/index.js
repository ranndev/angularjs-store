// @ts-check

const { task, src, series, parallel, watch } = require('gulp');
const clean = require('gulp-clean');
const registerCJSTasks = require('./build-cjs-task');
const registerESMTasks = require('./build-esm-task');
const registerUMDTasks = require('./build-umd-task');

/**
 * Register the base tasks (`clean`, `watch`, and `build`) and all of its subtasks.
 * @param {import('../gulpfile').Config} config
 */
module.exports = function registerTasks(config) {
  registerCJSTasks(config);
  registerESMTasks(config);
  registerUMDTasks(config);

  /**
   * A task assigned to clean up the `dist` folder.
   */
  task('clean', () => {
    return src(config.dist + '/*', { allowEmpty: true, read: false }).pipe(clean());
  });

  /**
   * A task that bundles the package into 3 different format (`cjs`, `umd`, and `esm`). The package will also build into
   * minified (for production) and non-minified (for development) version per format except for `esm`.
   */
  task('build', series('clean', parallel('build-production-cjs', 'build-production-umd', 'build-esm')));

  /**
   * A task that watches the designated paths and rebundle the package once there's a file change detected. Note that
   * the package is only bundled into non-minified version or only for development use.
   */
  task(
    'watch',
    series('clean', parallel('build-development-cjs', 'build-development-umd', 'build-esm'), function watcher() {
      watch(config.watchDirs, parallel('build-development-cjs', 'build-development-umd', 'build-esm'));
    }),
  );
};
