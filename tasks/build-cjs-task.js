// @ts-check

const fs = require('fs');
const mkdirp = require('mkdirp');
const { task, parallel } = require('gulp');
const { rollup } = require('rollup');
const typescript = require('rollup-plugin-typescript2');
const { terser } = require('rollup-plugin-terser');

/**
 * Bundle package to CJS format.
 * @param {import('../gulpfile').Config} config
 * @param {boolean=} minified
 */
async function bundleCJS(config, minified = false) {
  const options = config.getCommonRollupOptions();

  options.plugins = options.plugins || [];

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
    typescript({ cacheRoot: '.ts_cache_cjs' + (minified ? '_min' : '') }),
  );

  const bundle = await rollup(options);
  const fileBase = `${config.dist}/cjs/${config.name}`;

  await bundle.write({
    file: fileBase + (minified ? '.min.js' : '.js'),
    format: 'cjs',
    intro: minified ? '' : 'var __DEV__ = true;',
    sourcemap: true,
  });
}

/**
 * @param {import('../gulpfile').Config} config
 */
module.exports = function registerBuildCJSTasks(config) {
  /**
   * A task that writes the CJS index for development.
   */
  task('build-development-cjs-index', (done) => {
    mkdirp.sync(`${config.dist}/cjs`);

    const content = `module.exports = require('./${config.name}.js')`;

    fs.writeFile(`${config.dist}/cjs/index.js`, content, done);
  });

  /**
   * A task that writes the CJS index for production.
   */
  task('build-production-cjs-index', (done) => {
    mkdirp.sync(`${config.dist}/cjs`);

    const content = [
      `if (process.env.NODE_ENV === 'production') {`,
      `  module.exports = require('./${config.name}.min.js')`,
      '} else {',
      `  module.exports = require('./${config.name}.js')`,
      '}',
    ];

    fs.writeFile(`${config.dist}/cjs/index.js`, content.join('\n'), done);
  });

  /**
   * A task that bundles the package to a not minified CJS format.
   */
  task('build-development-cjs-inner', () => bundleCJS(config));

  /**
   * A task that bundles the package to minified CJS format.
   */
  task('build-production-cjs-inner', () => bundleCJS(config, true));

  /**
   * A task that builds the package to CJS format for development.
   */
  task('build-development-cjs', parallel('build-development-cjs-inner', 'build-development-cjs-index'));

  /**
   * A task that builds the package to CJS format for production.
   */
  task(
    'build-production-cjs',
    parallel('build-development-cjs-inner', 'build-production-cjs-inner', 'build-production-cjs-index'),
  );
};
