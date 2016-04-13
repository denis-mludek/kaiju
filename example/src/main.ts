import './logger'

import { snabbdom, startApp } from 'dompteuse'
import app from './app'


declare var require: any
const patch = snabbdom.init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/style'),
  require('dompteuse/lib/forceProps')
])

startApp({ app, patch, elm: document.body })
