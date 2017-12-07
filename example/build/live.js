const path = require('path')
const webpack = require('webpack')
const bs = require('browser-sync').create()
const chalk = require('chalk')

const resolve = require('./common/resolve')
const modules = require('./common/modules')
const plugins = require('./common/plugins')
const output = require('./common/output')


const compiler = webpack({
  context: path.resolve(__dirname, '..'),

  entry: ['./src/main.ts'],

  output,
  resolve,

  module: modules({ isProd: false }),

  plugins: plugins({ filename: 'app.css', isProd: false }),

  devtool: 'source-map'
})


// Live reload

// When a TS module changes, print a message so we know the app is going to get fully reloaded
bs.watch('src/**/*.ts').on('change', () => {
  console.log('bs watcher triggered !!!!')
  bs.notify('Code changed, reloading app...', 9999999)
})

// Webpack watches everything
compiler.watch({}, function(err, stats) {

  if (err) {
    console.error('webpack build error')
    throw err
  }

  const jsonStats = stats.toJson()
  if (jsonStats.errors.length > 0) {
    console.log('\n\n')
    console.log(chalk.red('Compilation errors: \n'))
    console.log(jsonStats.errors.join('\n'))
    return
  }

  console.log('\n\n')
  console.log(chalk.green('Compiled OK \n'))

  const changedModules = stats.compilation.modules.filter(module =>
    module.built && module.resource
  )

  const changedStyleModules = changedModules.filter(module =>
    module.resource.match(/\.(less)$/)
  )

  const hasOnlyStyleChanges = changedModules.length === changedStyleModules.length

  if (hasOnlyStyleChanges) bs.reload('*.css')
  else bs.reload()
})

bs.init({
  proxy: 'localhost:8080',

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