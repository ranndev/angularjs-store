// @ts-check

const path = require('path');
const registerTasks = require('./tasks');

/** @typedef {typeof config} Config */

const config = {
  name: 'angularjs-store',
  src: path.resolve(__dirname, 'src'),
  dist: path.resolve(__dirname, 'dist'),
  watchDirs: ['./src/**/*.ts', './typings/**/*.ts'],
  getCommonRollupOptions: () => /** @type {import('rollup').RollupOptions} */ ({
    input: './src/angularjs-store.ts',
    external: ['angular'],
  }),
};

registerTasks(config);
