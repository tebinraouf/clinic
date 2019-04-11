/* eslint-disable */

var gulp = require('gulp'),
  browserify = require('gulp-browserify'),
  concatCss = require('gulp-concat-css'),
  run = require('gulp-run');
var terser = require('gulp-terser');
var exec = require('child_process').exec;
const webpack = require('webpack-stream');
var merge = require('merge-stream');

var src = './process',
  app = './app';

gulp.task('js', function () {
  process.env.NODE_ENV = 'production';
  // process.env.NODE_ENV = 'development';

  var mainRender = gulp.src(src + '/js/render.js');
  var caseRender = gulp.src(src + '/js/render-case.js');

  return merge(mainRender, caseRender)
    .pipe(webpack({
      config: require('./webpack.config.js')
    }))
    .pipe(gulp.dest(app + '/js'));
});

gulp.task('html', function () {
  gulp.src(src + '/**/*.html');
});

gulp.task('css', function () {
  gulp.src(src + '/css/*.css')
    .pipe(concatCss('app.css'))
    .pipe(gulp.dest(app + '/css'));
});

gulp.task('fonts', function () {
  gulp.src('node_modules/bootstrap/dist/fonts/**/*')
    .pipe(gulp.dest(app + '/fonts'));
});

gulp.task('watch', ['serve'], function () {
  gulp.watch(src + '/js/**/*', ['js']);
  gulp.watch(src + '/css/**/*.css', ['css']);
  gulp.watch([app + '/**/*.html'], ['html']);
});

gulp.task('serve', ['html', 'js', 'css'], function () {
  run('electron app/main.js').exec();
});

gulp.task('minify', ['js'], function () {
  gulp.src('./app/js/render.js')
    .pipe(terser())
    .pipe(gulp.dest('./app/js/'))
})
gulp.task('minify-case', ['js-case'], function () {
  gulp.src('./app/js/render-case.js')
    .pipe(terser())
    .pipe(gulp.dest('./app/js/'))
})

gulp.task('build', ['html', 'js', 'css', 'fonts', 'minify'], function () {
  console.log("The app has been built.");
});

gulp.task('package', ['build'], function (cb) {
  exec('electron-packager . "Dr Tanya Clinic" --out ~/Desktop/ --overwrite --icon ./drfblogo.icns --ignore={"utility/","process/"}', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
    console.log("The app has been packaged.");
  });
})

gulp.task('package-travis', ['build'], function (cb) {
  exec('electron-packager . "Dr Tanya Clinic" --out ../ClinicApp --overwrite --icon drfblogo.icns --ignore={"utility/","process/"}', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
    console.log("The app has been packaged.");
  });
})

// gulp.task('default', ['watch', 'fonts', 'minify', 'serve']);

gulp.task('default', ['watch', 'fonts', 'serve']);