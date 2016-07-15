
import snabbdom from 'snabbdom'
import h from 'snabbdom/h'

import Render, { renderApp } from './lib/render'
import Component from './lib/component'
import Message from './lib/message'
import { snabbdomModule } from './lib/events'
import log from './lib/log'


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
  snabbdom,
  h
}
