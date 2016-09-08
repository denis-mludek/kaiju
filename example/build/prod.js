var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var extractStyl = ExtractTextPlugin.extract(
  'style',
  'css?modules&localIdentName=[name]-[local]-[hash:base64:5]!stylus'
)


module.exports = {
  entry: './src/main.ts',

  output: {
    filename: 'main.js',
    path: './public/'
  },

  module: {
    loaders: [
      { test: /\.ts(x?)$/, loader: 'ts', exclude: /node_modules/ },
      { test: /\.styl$/, loader: extractStyl }
    ]
  },

  resolve: {
    extensions: ['', '.js', '.ts']
  },

  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ]
}
