import { join } from 'path';
import gulp from 'gulp';
import del from 'del';
import meow from 'meow';
import sass from 'gulp-sass';
import babel from 'gulp-babel';
import runSeq from 'run-sequence';
import webpack from 'webpack-stream';

/*
 * NOTE: Ensure you have `gulp-cli` installed globally.
 *
 * Usage:
 *
 *   gulp [<task>] [<options>]
 *
 * Task:
 *
 *   clean       Removes `targetPath`. Use option flag to specify.
 *   build       Builds server and client code (gulp default)
 *   watch       Watches for changes to both server and client source code.
 *
 * Options:
 *
 *   --dist      Sets the targetPath to './dist'.
 *
 * Examples:
 *
 *   gulp        Builds code to `./dev`.
 *   gulp --dist Builds code to `./dist`.
 *   gulp watch  Builds code to `./dev`. Watch and recompiles source on change.
 */
const debug = process.env.NODE_ENV !== "production";
const sourcePath = './src';
const targetPath = meow().flags.dist ? './dist' : './dev';

gulp.task('clean', () => del([targetPath]));

gulp.task('fonts', () =>
  gulp
    .src(`${sourcePath}/client/assets/font/**/*`)
    .pipe(gulp.dest(`${targetPath}/client/assets/font`)));

gulp.task('libs', () =>
  gulp
    .src(`${sourcePath}/client/assets/libs/**/*`)
    .pipe(gulp.dest(`${targetPath}/client/assets/libs`)));

gulp.task('sass', () =>
  gulp
    .src(`${sourcePath}/client/assets/styles/app.scss`)
    .pipe(sass())
    .pipe(gulp.dest(`${targetPath}/client/assets/styles`)));

gulp.task('webpack', () =>
  gulp
    .src(`${sourcePath}/client/app.js`)
    .pipe(webpack({
      devtool: debug ? "inline-sourcemap" : null,
      entry: join(__dirname, `${sourcePath}/client/app.js`),
      output: {
        path: join(__dirname, `${targetPath}/client`),
        filename: 'app.js',
      },
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel'
        }],
      },
      plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
      ]
    }))
    .pipe(gulp.dest(`${targetPath}/client`)));

gulp.task('html', () =>
  gulp
    .src(`${sourcePath}/server/views/**/*.html`)
    .pipe(gulp.dest(`${targetPath}/server/views`)));

gulp.task('server', () =>
  gulp
    .src(`${sourcePath}/server/**/*.js`)
    .pipe(babel())
    .pipe(gulp.dest(`${targetPath}/server`)));

gulp.task('build', (done) => {
  runSeq('clean', ['fonts', 'libs', 'html', 'sass', 'server', 'webpack'], done);
});

gulp.task('watch', ['build'], () => {
  gulp.watch('./gulpfile.babel.js', ['build']);
  gulp.watch(`${sourcePath}/server/**/*.js`, ['server']);
  gulp.watch(`${sourcePath}/client/**/*.js`, ['webpack']);
  gulp.watch(`${sourcePath}/server/views/**/*.html`, ['html']);
  gulp.watch(`${sourcePath}/client/assets/styles/**/*.scss`, ['sass']);
});

gulp.task('default', ['build']);
