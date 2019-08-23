const rollup = require('rollup');
const typescriptPlugin = require('rollup-plugin-typescript2');
const terserPlugin = require('rollup-plugin-terser');

/**
 * Bundle the source code to `umd` format.
 * @param {any} config
 * @param {boolean=} minified
 */
module.exports = async function bundleUMD(config, minified = false) {
  const fileBase = `${config.dist}/umd/${config.name}`;
  const options = config.commonRollupOptions();

  options.plugins = options.plugins = [];

  if (minified) {
    options.plugins.push(
      terserPlugin.terser({
        compress: {
          dead_code: true,
          global_defs: {
            __DEV__: false,
          },
        },
        output: { comments: false },
        sourcemap: true,
        mangle: true,
      }),
    );
  }

  options.plugins.push(
    typescriptPlugin({
      cacheRoot: '.ts_cache_umd' + (minified ? '_min' : ''),
    }),
  );

  const bundle = await rollup.rollup(options);

  await bundle.write({
    file: fileBase + (minified ? '.min.js' : '.js'),
    format: 'umd',
    globals: { angular: 'angular' },
    intro: minified ? '' : 'var __DEV__ = true;',
    name: 'NgStore',
    sourcemap: true,
  });
};
