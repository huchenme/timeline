const gulp = require('gulp');
const del = require('del');
const $ = require('gulp-load-plugins')();

const lintFiles = ['src/**/*.js', 'test/**/*.js', 'gulpfile.js'];

gulp.task('eslint', function() {
  return gulp.src(lintFiles)
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe($.eslint.failOnError());
});

gulp.task('webpack', $.shell.task([
  'BUILD_DEV=1 ./node_modules/.bin/webpack'
]));

gulp.task('watch:webpack', $.shell.task([
  'BUILD_DEV=1 ./node_modules/.bin/webpack --watch --progress --color'
]));

gulp.task('watch:lint', function() {
  gulp.watch(lintFiles, ['eslint']);
});

gulp.task('watch', ['eslint', 'watch:lint']);

gulp.task('clean', function(cb) {
  del([
    'public/**/*', '!public/favicon.ico'
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

gulp.task('default', ['eslint', 'webpack']);
