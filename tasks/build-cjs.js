const gulp = require('gulp');
const fs = require('fs');

const bundleCJS = require('./functions/bundle-cjs');

module.exports = function registerBuildCJSTasks(config) {
  gulp.task('cjs:bundle-development', () => bundleCJS(config));

  gulp.task('cjs:bundle-production', () => bundleCJS(config, true));

  gulp.task('cjs:write-index-development', (done) => {
    const content = `module.exports = require('./${config.name}.cjs.js')`;
    fs.writeFile(`${config.dist}/cjs/index.js`, content, done);
  });

  gulp.task('cjs:write-index-production', (done) => {
    const content = [
      `if (process.env.NODE_ENV === 'production') {`,
      `  module.exports = require('./${config.name}.cjs.min.js')`,
      '} else {',
      `  module.exports = require('./${config.name}.cjs.js')`,
      '}',
    ].join('\n');

    fs.writeFile(`${config.dist}/cjs/index.js`, content, done);
  });

  gulp.task('cjs:build-development', gulp.series('cjs:bundle-development', 'cjs:write-index-development'));

  gulp.task(
    'cjs:build-production',
    gulp.series(gulp.parallel('cjs:bundle-development', 'cjs:bundle-production'), 'cjs:write-index-production'),
  );
};
