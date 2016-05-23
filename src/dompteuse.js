
import snabbdom from 'snabbdom';
import h from 'snabbdom/h';

import Render, { renderApp } from './render';
import Component from './component';
import Message from './message';
import { GlobalStream } from './globalStream';
import log from './log';


function startApp({ app, elm, patch }) {
  Render.patch = patch;
  renderApp(app, elm);
}

export {
  Component,
  Message,
  startApp,
  log,
  GlobalStream,

  // Proxied for convenient typesafety
  snabbdom,
  h
};
