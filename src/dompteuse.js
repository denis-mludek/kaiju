
import Render from './render';
import component from './component';


function startApp({ app, patch, elm }) {
  Render.patch = patch;

  // Non destructive patching inside the passed element
  const elmToReplace = document.createElement('div');
  elm.appendChild(elmToReplace);
  patch(elmToReplace, app);
}

export {
  component,
  startApp,
  Render
};
