// @ts-check

const { task, parallel } = require('gulp');
const { rollup } = require('rollup');
const typescript = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser');

/**
 * Bundle package to UMD format.
 * @param {import('../gulpfile').Config} config
 * @param {boolean=} minified
 */
async function bundleUMD(config, minified = false) {
  const options = config.getCommonRollupOptions();

  options.plugins = options.plugins = [];

  if (minified) {
    options.plugins.push(
      terser({
        compress: {
          dead_code: true,
          global_defs: { __DEV__: false },
        },
        output: { comments: false },
        sourcemap: true,
        mangle: true,
      }),
    );
  }

  options.plugins.push(
    // @ts-ignore
    typescript({
      cacheRoot: '.ts_cache_umd' + (minified ? '_min' : ''),
    }),
  );

  const bundle = await rollup(options);
  const fileBase = `${config.dist}/umd/${config.name}`;

  await bundle.write({
    file: fileBase + (minified ? '.min.js' : '.js'),
    format: 'umd',
    intro: minified ? '' : 'var __DEV__ = true;',
    name: 'NgStore',
    sourcemap: true,
  });
}

/**
 * @param {import('../gulpfile').Config} config
 */
module.exports = function registerUMDTasks(config) {
  /**
   * A task that bundles the package to a not minified UMD format.
   */
  task('build-development-umd-inner', () => bundleUMD(config));

  /**
   * A task that bundles the package to minified UMD format.
   */
  task('build-production-umd-inner', () => bundleUMD(config, true));

  /**
   * A task wrapper for `build-development-umd-inner` task.
   */
  task('build-development-umd', parallel('build-development-umd-inner'));

  /**
   * A task wrapper for `build-development-umd-inner` and `build-production-umd-inner` tasks.
   */
  task('build-production-umd', parallel('build-development-umd-inner', 'build-production-umd-inner'));
};
