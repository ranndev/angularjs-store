// @ts-check

const { task } = require('gulp');
const rollup = require('rollup');
const typescript = require('rollup-plugin-typescript2');
const replace = require('rollup-plugin-replace');

/**
 * Bundle package to ESM format.
 * @param {import('../gulpfile').Config} config
 */
async function bundleESM(config) {
  const options = config.getCommonRollupOptions();

  options.plugins = options.plugins || [];

  options.plugins.push(
    // @ts-ignore
    replace({ __DEV__: 'process.env.NODE_ENV !== "production"' }),
  );

  options.plugins.push(
    // @ts-ignore
    typescript({
      cacheRoot: '.ts_cache_esm',
      tsconfigOverride: {
        compilerOptions: { declaration: true },
      },
    }),
  );

  const bundle = await rollup.rollup(options);

  await bundle.write({
    file: `${config.dist}/esm/${config.name}.js`,
    format: 'esm',
    sourcemap: true,
  });
}

/**
 * @param {import('../gulpfile').Config} config
 */
module.exports = function registerESMTasks(config) {
  /**
   * A task that bundles the package to ESM format.
   */
  task('build-esm', () => bundleESM(config));
};
