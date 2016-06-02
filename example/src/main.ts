import './logger'

import { startApp } from 'dompteuse'
import app from './app'


declare var require: any

export const snabbdomModules = [
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/style'),
  require('./util/forceProps')
]

startApp({ app, snabbdomModules, elm: document.getElementById('screens') })
