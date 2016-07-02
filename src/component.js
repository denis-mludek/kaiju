import h from 'snabbdom/h'
import { renderComponentSync, renderComponentAsync } from './render'
import { shallowEqual } from './util'
import Messages from './messages'
import Observable from './observable'
import log, { shouldLog } from './log'


const empty = {}

export default function Component(options) {
  const { key, props = empty, defaultProps, initState, connect, render } = options

  if (defaultProps)
    Object.keys(defaultProps).forEach(key => {
      if (props[key] === undefined) props[key] = defaultProps[key]})

  const compProps = {
    key,
    hook: { create, postpatch, destroy },
    component: { props, initState, connect, render, key }
  }

  // An empty placeholder is returned, and that's all our parent is going to see.
  // Each component handles its own internal rendering.
  return h('div', compProps)
}

// Called when the component is created but isn't yet attached to the DOM
function create(_, vnode) {
  const { component } = vnode.data
  const { props, initState, connect } = component

  let connected = false

  // Internal callbacks
  component.lifecycle = {
    inserted,
    rendered
  }

  const messages = new Messages()

  component.state = initState(props)
  component.elm = vnode.elm
  component.placeholder = vnode
  component.messages = messages
  component.subscriptions = []

  const propsObservable = Observable.create(add => {
    add(component.props)
    component.lifecycle.propsChanged = add
  }, { replay: false }).named('props')

  // Eagerly subscribe so that the observable get its first value and we honour
  // the ObservableWithInitialValue interface contract.
  propsObservable.subscribe(x => x)

  // Message | Observable registration function
  const onObservable = function(observableOrMessage, fn) {

    const observable = observableOrMessage._isMessage
      ? messages.listen(observableOrMessage)
      : observableOrMessage

    const unsubscribe = observable.subscribe((val, name) => {
      const oldState = component.state

      if (shouldLog(log.message, component.key))
        console.log(`%c${name} %creceived by %c${component.key}`,
          'color: #C963C1', 'color: black',
          'font-weight: bold', 'with payload', val)

      const newState = fn(oldState, val)

      if (newState === undefined) return

      component.state = newState

      const shouldRender =
        // synchronous observables triggering before the very first render
        connected &&
        // the props observable triggered, a synchronous render is made right after so skip
        !component.lifecycle.propsChanging &&
        // null update
        !shallowEqual(oldState, newState)

      if (shouldRender)
        renderComponentAsync(component)
    })

    component.subscriptions.push(unsubscribe)
  }

  const connectParams = {
    on: onObservable,
    props: propsObservable,
    msg: messages
  }

  connect(connectParams)
  connected = true

  // First render
  // Create and insert the component's content
  // while its parent is still unattached for better perfs.
  renderComponentSync(component)
  component.placeholder.elm = component.vnode.elm
  component.placeholder.elm.__comp__ = component

  // The component is now attached to the document, activate the messages
  messages._activate(component.vnode.elm)
}

// Store the component depth once it's attached to the DOM so we can render
// component hierarchies in a predictive (top -> down) manner.
function inserted(component) {
  component.depth = getDepth(component.vnode.elm)
}

// Called on every parent re-render, this is where the props passed by the component's parent may have changed.
function postpatch(oldVnode, vnode) {
  const oldData = oldVnode.data
  const newData = vnode.data

  const component = oldData.component
  const oldProps = component.props
  const newProps = newData.component.props

  // Update the original component with any property that may have changed during this render pass
  component.props = newProps
  component.placeholder = vnode

  newData.component = component

  // If the props changed, render immediately as we are already
  // in the render context of our parent
  if (!shallowEqual(oldProps, newProps)) {

    component.lifecycle.propsChanging = true
    component.lifecycle.propsChanged(newProps)
    component.lifecycle.propsChanging = false

    renderComponentSync(component)
  }
}

function rendered(component, newVnode) {
  // Store the new vnode inside the component so we can diff it next render
  component.vnode = newVnode

  // Lift any 'remove' hook to our placeholder vnode for it to be called
  // as the placeholder is all our parent vnode knows about.
  const hook = newVnode.data.hook && newVnode.data.hook.remove
  if (hook) component.placeholder.data.hook.remove = hook
}

function destroy(vnode) {
  const comp = vnode.data.component
  comp.vnode.elm.__comp__ = null

  destroyVnode(comp.vnode)
  comp.destroyed = true

  for (let i = 0; i < comp.subscriptions.length; i++) {
    comp.subscriptions[i]()
  }
}

// Destroy our vnode recursively
function destroyVnode(vnode) {
  const data = vnode.data

  if (!data) return
  if (data.hook && data.hook.destroy) data.hook.destroy(vnode)
  // Can't invoke modules' destroy hook as they're hidden in snabbdom's closure
  if (vnode.children) vnode.children.forEach(destroyVnode)
  if (data.vnode) destroyVnode(data.vnode)
}

function getDepth(elm) {
  let depth = 0
  let parent = elm.parentElement
  while (parent) {
    depth++
    parent = parent.parentElement
  }
  return depth
}
