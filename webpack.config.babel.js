import webpack from 'webpack';
import { join } from 'path;'

const isDev = process.env.NODE_ENV !== 'production';

export default {
  devtool: isDev ? 'inline-sourcemap' : null,
  entry: './src/client/app.js',
  output: {
    path: join(__dirname, `/${isDev ? 'dev' : 'dist'}/client/`),
    filename: 'app.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
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
