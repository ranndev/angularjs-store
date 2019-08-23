const rollup = require('rollup');
const typescriptPlugin = require('rollup-plugin-typescript2');
const replacePlugin = require('rollup-plugin-replace');

/**
 * Bundle the source code to `esm` format.
 * @param {any} config
 */
module.exports = async function bundleESM(config) {
  const options = config.commonRollupOptions();

  options.plugins = options.plugins || [];

  options.plugins.push(
    replacePlugin({
      __DEV__: 'process.env.NODE_ENV !== "production"',
    }),
  );

  options.plugins.push(
    typescriptPlugin({
      cacheRoot: '.ts_cache_esm',
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
        },
      },
    }),
  );

  const bundle = await rollup.rollup(options);

  await bundle.write({
    file: `${config.dist}/esm/${config.name}.js`,
    format: 'esm',
    sourcemap: true,
  });
};
