import { resolve } from 'path';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

require('dotenv-safe').load();

let plugins = [];

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
