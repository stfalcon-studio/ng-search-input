'use strict';

var gulp = require('gulp');
var ts = require('gulp-typescript');
var merge = require('merge2');
var inlineNg2Template = require('gulp-inline-ng2-template');

gulp.task('default', function () {
  // do nothing for now
});


gulp.task('compile', function () {
  var tsProject = ts.createProject('tsconfig.json', { noImplicitAny: false, declaration: true });
  var tsResult = gulp.src(['src/app/ng-search-input/**/*.ts'])
        .pipe(inlineNg2Template({ base: '/src/app/ng-search-input/ng-search-input' }))
        .pipe(tsProject());
  return merge([ // Merge the two output streams, so this task is finished when the IO of both operations is done. 
        tsResult.dts.pipe(gulp.dest('dist/lib')),
        tsResult.js.pipe(gulp.dest('dist/lib'))
    ])
});
