import { resolve } from 'path';
import webpack from 'webpack';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

require('dotenv-safe').load();

let plugins = [
  new webpack.EnvironmentPlugin(['PROTOCOL', 'HOST', 'PORT', 'NODE_ENV']),
];

if (process.env.NODE_ENV === 'production') {
  plugins = [
    ...plugins,
    new UglifyJSPlugin({
      compress: {
        warnings: false,
      },
      mangle: false,
      sourcemap: false,
    }),
  ];
}

export default {
  entry: './src/client/app.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          resolve(__dirname, 'src/client'),
        ],
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.scss$/,
        include: [
          resolve(__dirname, 'src/client/assets'),
        ],
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins,
};
