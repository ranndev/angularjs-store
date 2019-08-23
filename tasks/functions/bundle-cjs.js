const rollup = require('rollup');
const typescriptPlugin = require('rollup-plugin-typescript2');
const terserPlugin = require('rollup-plugin-terser');

/**
 * Bundle the source code to `cjs` format.
 * @param {any} config
 * @param {boolean=} minified
 */
module.exports = async function bundleCJS(config, minified = false) {
  const fileBase = `${config.dist}/cjs/${config.name}`;
  const options = config.commonRollupOptions();

  options.plugins = options.plugins || [];

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
      cacheRoot: '.ts_cache_cjs' + (minified ? '_min' : ''),
    }),
  );

  const bundle = await rollup.rollup(options);

  await bundle.write({
    intro: minified ? '' : 'var __DEV__ = true;',
    file: fileBase + (minified ? '.min.js' : '.js'),
    format: 'cjs',
    sourcemap: true,
  });
};
