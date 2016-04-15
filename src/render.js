
import h from 'snabbdom/h';
import log from './log';

let componentsToRender = [];
let newComponents = [];
let rendering = false;
let nextRender;

const Render = { patch: undefined };
export default Render;


export function renderApp(app, appElm) {
  // Non destructive patching inside the app element
  const elmToReplace = document.createElement('div');
  const appNode = Render.patch(elmToReplace, app);
  appElm.appendChild(appNode.elm);
  newComponents.forEach(c => c.lifecycle.inserted(c));
}

export function renderComponent(component) {
  if (rendering) {
    console.warn('A component tried to re-render while a rendering was already ongoing', component.elm);
    return;
  }

  // This component is already scheduled for the next redraw.
  // For instance, this can easily happen while the app's tab is inactive.
  // Avoids doing more work than necessary when re-activating it.
  if (componentsToRender.indexOf(component) !== -1) return;

  componentsToRender.push(component);

  if (!nextRender)
    nextRender = requestAnimationFrame(renderNow);
};

export function renderComponentNow(component) {
  const { state, elm, render, vnode, destroyed } = component;

  // Bail if the component is already destroyed.
  // This can happen if the parent renders first and decide a child component should be removed.
  if (destroyed) return;

  const isNew = vnode === undefined;
  const { patch } = Render;

  let beforeRender;

  if (log.render) beforeRender = performance.now();
  const newVnode = render(state);

  patch(vnode || elm, newVnode);

  if (log.render) console.log(`Render component '${component.key}'`,
    (performance.now() - beforeRender) + ' ms', component);

  component.lifecycle.rendered(component, newVnode);
  if (isNew) newComponents.push(component);
}

function renderNow() {
  rendering = true;

  const components = componentsToRender;

  nextRender = undefined;
  componentsToRender = [];
  newComponents = [];

  if (log.render) console.log('%cNew rendering frame', 'color: orange');

  // Render components in a top-down fashion.
  // This ensures the rendering order is predictive and props & states are consistent.
  components.sort((compA, compB) => compA.depth - compB.depth);
  components.forEach(renderComponentNow);

  rendering = false;

  newComponents.forEach(c => c.lifecycle.inserted(c));
}
