import './logger'

import { startApp } from 'kaiju'

import app from './app'
import forceProps from './util/forceProps'


const snabbdomModules = [
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/attributes'),
  forceProps
]

startApp({ app, snabbdomModules, elm: document.getElementById('screens')! })
