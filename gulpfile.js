var gulp = require('gulp'),
  plugins = require('gulp-load-plugins')();

gulp.task('validate', ['eslint'], function() {
  return gulp.src('test/**/*.js', {read: false})
    .pipe(plugins.mocha());
});

gulp.task('eslint', function() {
  return gulp.src(['src/**/*.js', 'test/**/*.js'])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failOnError());
});

gulp.task('watch:webpack', plugins.shell.task([
  './node_modules/.bin/webpack --watch'
]));

gulp.task('watch:test', function() {
  gulp.watch(['src/**/*.js', 'test/**/*.js'], ['validate']);
});

gulp.task('watch', ['watch:webpack', 'watch:test']);

gulp.task('clean', function() {
  gulp.src('./public/*')
    .pipe(plugins.clean({force: true}));
});

gulp.task('deploy', ['clean'], plugins.shell.task([
  './node_modules/.bin/webpack -p',
  'git add -A public/*',
  'git commit -m "pushing production assets"',
  'git push origin master',
  'avoscloud -g deploy'
], {
  ignoreErrors: true
}));
