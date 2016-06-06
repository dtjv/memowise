const isDev = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: isDev ? 'inline-sourcemap' : null,
  entry: './client/app.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  output: {
    path: path.join(__dirname, `/${isDev ? 'dev' : 'dist'}/client/`),
    filename: 'app.js',
  },
  plugins: isDev ? [] : [
    new webpack.EnvironmentPlugin(['NODE_ENV', 'PROTOCOL', 'HOST', 'PORT']),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: false,
      sourcemap: false,
    }),
  ],
};
