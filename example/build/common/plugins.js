const path = require('path')
const webpack = require('webpack')
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')


module.exports = ({ filename, isProd }) => {
  const extractCSS = new ExtractTextPlugin(filename)

  const uglifyJS = new webpack.optimize.UglifyJsPlugin({
    compress  : { warnings: false },
    output    : { comments: false },
    sourceMap : false
  })

  const styleLinter = StyleLintPlugin({
    configFile  : path.resolve(__dirname, '../stylelint.json'),
    files       : '**/*.less',
    emitErrors  : isProd
  })

  const defineEnv = new webpack.DefinePlugin({
    env: {
      isProd: `${isProd}`,
      isDev: `${!isProd}`
    }
  })

  const circularDeps = new CircularDependencyPlugin({
    exclude: /node_modules/,
    failOnError: true
  })

  const moduleConcat = new webpack.optimize.ModuleConcatenationPlugin()

  const tsTypeCheck = new ForkTsCheckerWebpackPlugin()

  return [extractCSS, styleLinter, defineEnv, circularDeps]
    .concat(isProd ? [uglifyJS, moduleConcat] : [tsTypeCheck])
}