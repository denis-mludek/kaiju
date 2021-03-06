const path = require('path')

const resolve = require('./common/resolve')
const modules = require('./common/modules')
const plugins = require('./common/plugins')
const output = require('./common/output')


module.exports = {
  context: path.resolve(__dirname, '..'),

  entry: ['./src/main.ts'],

  output,
  resolve,

  module: modules({ isProd: false }),

  plugins: plugins({ filename: 'app.css', isProd: false }),

  devtool: 'source-map'
}
