import gulp from 'gulp';
import jasmineNode from 'gulp-jasmine-node';
import babel from 'gulp-babel';
import gulpBabelIstanbul from 'gulp-babel-istanbul';
import coveralls from 'gulp-coveralls';
import injectModules from 'gulp-inject-modules';
import nodemon from 'gulp-nodemon';

/**
 *gulp task for transpiling ES6 to ES5
 */
gulp.task('transpile', () => {
  gulp.src(['models/**.js', 'routes/**.js', 'serverone.js'])
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(gulp.dest('dist/'));
});

/**
 *default gulp task that runs whenever gulp is called without specifing a task
 */
gulp.task('default', ['transpile', 'serverone']);

/**
 * Gulp task for running tests Specs
 */
gulp.task('run-test', () => {
  gulp.src(['tests/*Spec.js'])
  .pipe(jasmineNode({
    timeout: 10000
  }));
});

/**
 * gulp task for getting coverage report on tests
 */
gulp.task('coverage', (cb) => {
  gulp.src(['src/inverted-index.js', 'app.js'])
    .pipe(gulpBabelIstanbul())
    .pipe(injectModules())
    .on('finish', () => {
      gulp.src('tests/*.js')
      .pipe(babel())
      .pipe(injectModules())
      .pipe(jasmineNode())
      .pipe(gulpBabelIstanbul.writeReports())
      .pipe(gulpBabelIstanbul.enforceThresholds({ thresholds: { global: 70 } }))
      .on('end', cb);
    });
});

/**
 * gulp task to send coverage reports to coveralls.io
 */
gulp.task('coveralls', ['coverage'], () => {
  if (!process.env.CI) {
    return;
  }
  return gulp.src('./coverage/lcov.info')
    .pipe(coveralls());
});

/**
 * gulp task to serve the App on localhost
 */
gulp.task('serverone', () =>
  nodemon({
    script: 'dist/serverone.js',
    ext: 'js',
    env: { NODE_ENV: process.env.NODE_ENV }
  })
);
