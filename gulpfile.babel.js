
import gulp from 'gulp';
import dotenv from 'dotenv';
import coverage from 'gulp-coverage';
import nodemon from 'gulp-nodemon';
import jasmineNode from 'gulp-jasmine-node';
import istanbulReport from 'gulp-istanbul-report';
import coveralls from 'gulp-coveralls';
import babel from 'gulp-babel';
import istanbul from 'gulp-babel-istanbul';
import injectModules from 'gulp-inject-modules';
import exit from 'gulp-exit';

gulp.task('test', () => {
  gulp.src('./API/tests/voteSpec.js')
    .pipe(babel())
    .pipe(jasmineNode())
});