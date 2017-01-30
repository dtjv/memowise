import webpack from 'webpack';
import { join } from 'path';

require('dotenv-safe').load();

let plugins = [
  new webpack.EnvironmentPlugin([
    'PROTOCOL',
    'HOST',
    'PORT',
  ]),
];

if (process.env.NODE_ENV === 'production') {
  plugins = [
    ...plugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: false,
      sourcemap: false,
    }),
    new webpack.optimize.OccurenceOrderPlugin(true),
  ];
}

export default {
  entry: './src/client/app.js',
  output: {
    path: join(__dirname, '/build'),
    filename: 'bundle.js',
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
  plugins,
};
