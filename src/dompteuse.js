
import Render from './render';
import component from './component';


function startApp({ app, patch, elm }) {
  Render.patch = patch;

  // Non destructive patching inside the passed element
  const elmToReplace = document.createElement('div');
  const newVnode = patch(elmToReplace, app);

  elm.appendChild(newVnode.elm);
}

export {
  component,
  startApp,
  Render
};
