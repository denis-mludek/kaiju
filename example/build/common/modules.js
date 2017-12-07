const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractLess = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: [
    { loader: 'css-loader', query: { modules: true, localIdentName: '[local]-[hash:base64:5]' } },
    { loader: 'less-loader' }
  ]
})

const tsconfig = path.resolve(__dirname, '../../tsconfig.json')
const tslintConfig = path.resolve(__dirname, '../tslint.json')

module.exports = ({ isProd }) => {
  const tsOptions = {
    configFile: tslintConfig,
    emitErrors: isProd,
    failOnHint: isProd
  }

  const tsLinter    = { test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader', options: tsOptions }
  const tsLoader    = { test: /\.ts$/, loader: 'ts-loader', options: { configFile: tsconfig, transpileOnly: !isProd } }
  const styleLoader = { test: /\.less$/, loader: extractLess }

  return {
    rules: [ tsLinter, tsLoader, styleLoader ]
  }
}