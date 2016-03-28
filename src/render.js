
import h from 'snabbdom/h';


let componentsToRender = [];
let rendering = false;
let nextRender;

const Render = { patch: undefined, log: false };
export default Render;


export function createComponent(component) {
  // Typically, when a parent is getting created/patched
  // and introduces new child components, we are in the middle of a rendering.
  if (rendering)
    renderComponentNow(component);
  else
    renderComponent(component);
};

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

function renderNow() {
  rendering = true;

  const components = componentsToRender;

  nextRender = undefined;
  componentsToRender = [];

  if (Render.log) console.log('%cNew rendering frame', 'color: orange');

  // Render components in a top-down fashion.
  // This ensures the rendering order is predictive and props & states are consistent.
  components.sort((compA, compB) => compA.depth - compB.depth);
  components.forEach(renderComponentNow);

  rendering = false;
}

function renderComponentNow(component) {
  const { id, localState, actions, props, state, elm, render, vnode, destroyed } = component;

  // Bail if the component is already destroyed.
  // This can happen if the parent renders first and decide a child component should be removed.
  if (destroyed) return;

  const { patch, log } = Render;

  let beforeRender;

  if (log) beforeRender = performance.now();
  const newVnode = render({ props, state, localState, actions });

  // First render
  if (!vnode) {
    const placeholder = document.createElement('div');
    elm.appendChild(placeholder);
  }

  patch(vnode || elm.firstChild, newVnode);
  if (log) console.log(`Render component '${component.key}'`,
    (performance.now() - beforeRender) + ' ms', component);

  component.vnode = newVnode;
}
