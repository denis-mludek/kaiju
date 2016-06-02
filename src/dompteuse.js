
import snabbdom from 'snabbdom';
import h from 'snabbdom/h';

import Render, { renderApp } from './render';
import Component from './component';
import Message from './message';
import { GlobalStream } from './globalStream';
import Events, { snabbdomModule } from './events';
import log from './log';


function startApp({ app, elm, snabbdomModules }) {
  const modules = snabbdomModules.concat(snabbdomModule);
  patch = Render.patch = snabbdom.init(modules);
  renderApp(app, elm);
}

let patch;

export {
  Component,
  Message,
  Events,
  startApp,
  log,
  GlobalStream,
  patch,

  // Proxied for convenient typesafety
  snabbdom,
  h
};
