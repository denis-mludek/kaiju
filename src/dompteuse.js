
import { init } from 'snabbdom';
import h from 'snabbdom/h';
import Render from './render';
import component from './component';


function startApp({ app, elm }) {
  const patch = init([
    require('snabbdom/modules/class'),
    require('snabbdom/modules/props'),
    require('snabbdom/modules/attributes'),
    require('snabbdom/modules/eventlisteners'),
    require('snabbdom/modules/style')
  ]);

  Render.patch = patch;

  // Non destructive patching inside the passed element
  const elmToReplace = document.createElement('div');
  const newVnode = patch(elmToReplace, app);

  elm.appendChild(newVnode.elm);
}

export {
  component,
  startApp,
  Render,
  h
};
