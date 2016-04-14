
import snabbdom from 'snabbdom';
import h from 'snabbdom/h';
import kefir from 'kefir';

import Render from './render';
import Component from './component';
import { Action, ActionStream } from './actionStream';
import log from './log';


function startApp({ app, elm, patch }) {
  Render.patch = patch;

  // Non destructive patching inside the passed element
  const elmToReplace = document.createElement('div');
  const newVnode = patch(elmToReplace, app);

  elm.appendChild(newVnode.elm);
}

function makeState(properties, fn) {
  return kefir.combine(properties, fn).toProperty()
}

export {
  Component,
  startApp,
  log,
  Action,
  ActionStream,
  // Proxied for convenient typesafety
  snabbdom,
  h,
  kefir,
  makeState
};
