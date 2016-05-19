
import snabbdom from 'snabbdom';
import h from 'snabbdom/h';
import xs from 'xstream';

import Render, { renderApp } from './render';
import Component from './component';
import Event from './event';
import { Action, ActionStream } from './actionStream';
import log from './log';


function startApp({ app, elm, patch }) {
  Render.patch = patch;
  renderApp(app, elm);
}

function makeState() {
  // TODO: is that even useful then
  return xs.combine.apply(null, arguments)
}

export {
  Component,
  Event,
  startApp,
  log,
  Action,
  ActionStream,
  // Proxied for convenient typesafety
  snabbdom,
  h,
  makeState
};
