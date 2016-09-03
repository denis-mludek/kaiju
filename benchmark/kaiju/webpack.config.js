var webpack = require('webpack')

module.exports = {
  entry: './index.ts',

  output: {
    filename: 'index.js',
  },

  module: {
    loaders: [
      { test: /\.ts(x?)$/, loader: 'ts', exclude: /node_modules/ }
    ]
  }
}
