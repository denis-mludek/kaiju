var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var extractStyl = ExtractTextPlugin.extract({
  fallbackLoader: 'style-loader',
  loader: [
    { loader: 'css-loader', query: { modules: true, localIdentName: '[name]-[local]-[hash:base64:5]' } },
    { loader: 'stylus-loader' }
  ]
})

var tsconfig = path.resolve('../tsconfig')


module.exports = {
  entry: './src/main.ts',

  output: {
    filename: 'main.js',
    path: './public/'
  },

  module: {
    loaders: [
      { test: /\.ts(x?)$/, loader: 'ts-loader', exclude: /node_modules/ },
      { test: /\.styl$/, loader: extractStyl }
    ]
  },

  resolve: {
    extensions: ['.js', '.ts'],
    modules: [path.resolve('./src'), path.resolve('./node_modules')]
  },

  devtool: 'inline-source-map',

  plugins: [
    new ExtractTextPlugin('style.css')
  ],

  performance: {
    hints: false
  }
}
