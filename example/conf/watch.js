var webpack = require('webpack');

module.exports = {
  entry: './src/main.ts',

  output: {
    filename: 'main.js',
    path: './public/'
  },

  module: {
    loaders: [
      { test: /\.ts(x?)$/, loader: 'ts', exclude: /node_modules/ }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  devtool: 'inline-source-map'
};
