var webpack = require('webpack')

module.exports = {
  entry: './index.tsx',

  output: {
    filename: 'index.js',
  },

  module: {
    loaders: [
      { test: /\.ts(x?)$/, loader: 'ts', exclude: /node_modules/ }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]
}
