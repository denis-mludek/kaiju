
import snabbdom from 'snabbdom'
import h from 'snabbdom/h'

import { setPatchFunction, renderSync, Render } from './lib/render'
import Component from './lib/component'
import Message from './lib/message'
import { eventsModule } from './lib/events'
import log from './lib/log'


function startApp({ app, elm, snabbdomModules }) {
  const modules = snabbdomModules.concat(eventsModule)
  setPatchFunction(snabbdom.init(modules))
  renderSync(elm, app)
}

export {
  Component,
  Message,
  startApp,
  log,
  Render,
  h
}
