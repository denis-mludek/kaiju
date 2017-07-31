
import { init } from 'snabbdom'
import h from 'snabbdom/h'
import toVNode from 'snabbdom/tovnode'

import { setPatchFunction, renderSync, Render } from './lib/render'
import Component from './lib/component'
import Message from './lib/message'
import { eventsModule } from './lib/events'
import { Observable } from './observable'
import { Store } from './store'
import log from './lib/log'


function startApp({ app, elm, replaceElm, snabbdomModules }) {
  const modules = snabbdomModules.concat(eventsModule)
  setPatchFunction(init(modules))
  renderSync(replaceElm ? toVNode(elm) : elm, app, replaceElm)
}

export {
  Component,
  Message,
  Observable,
  Store,
  startApp,
  log,
  Render,
  h
}
