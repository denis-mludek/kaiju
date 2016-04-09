
import { init } from 'snabbdom';
import h from 'snabbdom/h';
import kefir from 'kefir';

import Render from './render';
import Component from './component';
import { Action, ActionStream } from './actionStream';
import log from './log';


function startApp({ app, elm }) {

  // TODO: Make this configurable
  const patch = init([
    require('snabbdom/modules/class'),
    require('snabbdom/modules/props'),
    require('snabbdom/modules/attributes'),
    require('snabbdom/modules/style'),
    require('./liveProps')
  ]);

  Render.patch = patch;

  // Non destructive patching inside the passed element
  const elmToReplace = document.createElement('div');
  const newVnode = patch(elmToReplace, app);

  elm.appendChild(newVnode.elm);
}

export {
  Component,
  startApp,
  log,
  h,
  kefir,
  Action,
  ActionStream
};
