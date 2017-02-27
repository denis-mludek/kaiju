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
      { test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/ },
      { test: /\.styl$/, loader: extractStyl }
    ]
  },

  resolve: {
    extensions: ['.js', '.ts'],
    modules: [path.resolve('./src'), path.resolve('./node_modules')]
  },

  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      'process.env.IMMUPDATE_DEEP_FREEZE': '"false"'
    })
  ],

  performance: {
    hints: false
  }
}
