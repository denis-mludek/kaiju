
const webpack = require('webpack')
const bs = require('browser-sync').create()
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const chalk = require('chalk')


const extractStyl = ExtractTextPlugin.extract(
  'style',
  'css?modules&localIdentName=[name]-[local]-[hash:base64:5]!stylus'
)

const compiler = webpack({
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

  devtool: 'inline-source-map',

  plugins: [
    new ExtractTextPlugin('style.css')
  ]
})

compiler.watch({}, function(err, stats) {
  if (err) {
    console.error('webpack build error')
    throw err
  }

  var jsonStats = stats.toJson()
  if (jsonStats.errors.length > 0) {
    console.log('\n\n')
    console.log(chalk.red('Compilation errors: \n'))
    console.log(jsonStats.errors.join('\n'))
    return
  }

  console.log('\n\n')
  console.log(chalk.green('Compiled OK \n'))

  var changedModules = stats.compilation.modules.filter(module =>
    module.built && module.resource
  )
  var changedStyleModules = changedModules.filter(module =>
    module.resource.match(/\.(styl)$/)
  )
  var hasOnlyStyleChanges = changedModules.length === changedStyleModules.length

  if (hasOnlyStyleChanges) bs.reload('*.css')
  else bs.reload()
})

bs.init({
  proxy: 'localhost:8000',

  notify: {
    styles: {
      top: '10px',
      right: '10px',
      margin: '0px',
      padding: '5px',
      position: 'fixed',
      fontSize: '26px',
      zIndex: '9999',
      borderRadius: '6px',
      color: 'white',
      textAlign: 'center',
      display: 'block',
      backgroundColor: '#FF3333'
    }
  }
})
