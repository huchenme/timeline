var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')();

gulp.task('validate', ['eslint'], function() {
  return gulp.src('test/**/*.js', {read: false})
    .pipe($.mocha());
});

gulp.task('eslint', function() {
  return gulp.src(['src/**/*.js', 'test/**/*.js'])
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
});

gulp.task('webpack', $.shell.task([
  'BUILD_DEV=1 ./node_modules/.bin/webpack'
]));

gulp.task('watch:webpack', $.shell.task([
  'BUILD_DEV=1 ./node_modules/.bin/webpack --watch'
]));

gulp.task('watch:test', function() {
  gulp.watch(['src/**/*.js', 'test/**/*.js'], ['validate']);
});

gulp.task('watch', ['watch:webpack', 'watch:test']);

gulp.task('clean', function(cb) {
  del([
    'public/**/*'
  ], cb);
});

gulp.task('deploy', ['clean'], $.shell.task([
  './node_modules/.bin/webpack -p',
  'git add -A public/*',
  'git commit -m "pushing production assets"',
  'git push origin master',
  'avoscloud -g deploy'
], {
  ignoreErrors: true
}));
