const path = require('path');

const registerCleanTask = require('./tasks/clean');
const registerBuildTask = require('./tasks/build');
const registerWatchTask = require('./tasks/watch');

const config = {
  dist: path.resolve(__dirname, 'dist'),
  src: path.relative(__dirname, 'src'),
  name: 'angularjs-store',
  commonRollupOptions: () => ({
    input: './src/angularjs-store.ts',
    external: ['angular'],
  }),
};

registerCleanTask(config);
registerBuildTask(config);
registerWatchTask(config);
