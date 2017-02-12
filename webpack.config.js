require('dotenv-safe').load();

const { resolve } = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

let plugins = [];

if (process.env.NODE_ENV === 'production') {
  plugins = [
    ...plugins,
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    new UglifyJSPlugin(),
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
