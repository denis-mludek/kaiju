
import { Store } from 'fluxx';

import render from './render';
import component from './component';


function startApp({ app, patch, elm, log }) {
  render.patch = patch;

  if (log) {
    render.log = true;
    Store.log = true;
  }

  // Non destructive patching inside the passed element
  const elmToReplace = document.createElement('div');
  elm.appendChild(elmToReplace);
  patch(elmToReplace, app);
}

export {
  component,
  startApp
};
