
import h from 'snabbdom/h'
import Vnode from 'snabbdom/vnode'
import log, { shouldLog } from './log'

let componentsToRender = []

let rendering = false
let nextRender = undefined
let renderBeginTime = undefined


const Render = { patch: undefined }
export default Render


let _isFirstRender = true
export function isFirstRender() {
  return _isFirstRender
}

export function renderApp(app, appElm) {
  logBeginRender()

  const el = document.createElement('div')
  const emptyVnode = Vnode('div', { key: '_init' }, [], undefined, el)
  const appNode = Render.patch(emptyVnode, app)

  appElm.appendChild(appNode.elm)

  processRenderQueue()

  _isFirstRender = false

  logEndRender()
}


export function renderComponentNow(component) {
  if (componentsToRender.indexOf(component) === -1)
    componentsToRender.push(component)
}

/* Optimization of the above function: A new component cannot be possibly found in the render queue */
export function renderNewComponentNow(component) {
  componentsToRender.push(component)
}

export function renderComponentNextFrame(component) {
  if (rendering) {
    // This is pretty bad but not breaking: It means the developer
    // synchronously send a message inside a render() function.
    // Probably just a mistake.
    console.warn('A component tried to re-render while a rendering was already ongoing', component.elm)
    return
  }

  // This component is already scheduled for the next redraw.
  // For instance, this can happen while the app's tab is inactive,
  // or when synchronously sending a few messages.
  // Avoids doing more work than necessary when re-activating it.
  if (componentsToRender.indexOf(component) !== -1) return

  componentsToRender.push(component)

  if (!nextRender)
    nextRender = requestAnimationFrame(renderNow)
}

function renderComponent(component) {
  const { props, state, messages, elm, render, vnode, destroyed } = component

  // Bail if the component is already destroyed.
  // This can happen if the parent renders first and decide a child component should be removed.
  if (destroyed) return

  const isNew = vnode === undefined
  const { patch } = Render

  let beforeRender

  if (log.render) beforeRender = performance.now()
  const newVnode = render({ props, state, msg: messages })

  let target = vnode
  if (!target) {
    const div = document.createElement('div')
    elm.appendChild(div)
    target = Vnode('div', { key: '_init' }, [], undefined, div)
  }

  patch(target, newVnode)

  if (shouldLog(log.render, component.key)) {
    const renderTime = Math.round((performance.now() - beforeRender) * 100) / 100
    console.log(`Render component %c${component.key}`,
      'font-weight: bold', renderTime + ' ms', '| props: ', props, '| state: ',state)
  }

  component.lifecycle.rendered(component, newVnode)
}

function renderNow() {
  rendering = true

  nextRender = undefined

  logBeginRender()

  // Render components in a top-down fashion.
  // This ensures the rendering order is predictive and props/states are consistent.
  // If we didn't do that, a component could first be rendered following a state change
  // but then miss out on a props change from its parent.
  componentsToRender.sort((compA, compB) => compA.depth - compB.depth)
  processRenderQueue()

  rendering = false

  logEndRender()
}

function processRenderQueue() {
  while (componentsToRender.length) {
    const component = componentsToRender.shift()
    renderComponent(component)
    if (component.onFirstRender) component.onFirstRender()
  }
  componentsToRender = []
}

function logBeginRender() {
  if (log.render) {
    renderBeginTime = performance.now()
    console.log('%cRender - begin', 'color: orange')
  }
}

function logEndRender() {
  if (log.render) {
    const time = Math.round((performance.now() - renderBeginTime) * 100) / 100
    console.log(`%cRender - end (${time}ms)\n\n\n`, 'color: orange')
  }
}
