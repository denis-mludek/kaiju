
import snabbdom from 'snabbdom'
import h from 'snabbdom/h'

import Render, { renderApp } from './render'
import Component from './component'
import Message from './message'
import { snabbdomModule } from './events'
import log from './log'


function startApp({ app, elm, snabbdomModules }) {
  const modules = snabbdomModules.concat(snabbdomModule)
  patch = Render.patch = snabbdom.init(modules)
  renderApp(app, elm)
}

let patch

export {
  Component,
  Message,
  startApp,
  log,
  patch,

  // Proxied for convenient typesafety
  snabbdom,
  h
}
