import { VNode, Component, ConnectParams, RenderParams, Message, Render } from 'kaiju'
import { update } from 'space-lift'


/**
 * Component wrapper for simple swap transitions (ONE item is replaced by another, be it another Element or undefined)
 * The entering element is not added to the DOM till the exiting element completely finished its animation.
 * This has a few benefits:
 *  - There is no need to bother with changing the entering node's display to 'none' since it's not in the DOM yet
 *  - More performant: Only one VDOM tree rendered at any given time; particularly noticeable at animation time
 *  - This is less work and is thus less confusing for browsers (fixes a rendering bug with Chrome 46)
 */
export default function animate(animations: Animations) {
  return (child: VNode | undefined, sel: string = 'component') => {
    const props = { child, animations }
    return Component({ sel, name: 'singleElementAnimation', initState, props, connect, render })
  }
}

type Props = {
  animations: Animations
  child: VNode | undefined
}

type State = {
  activeChild: VNode | undefined
}

function initState(props: Props) {
  return {
    activeChild: props.child
  }
}

const setActiveChild = Message<VNode | undefined>('setActiveChild')

function connect({ on, msg, props }: ConnectParams<Props, State>) {

  let isPlayingRemoveAnimation = false

  on(props.sliding2(), (state, [newProps, oldProps]) => {
    // First render, no animation
    if (!oldProps) return state

    const newChild = newProps.child
    const oldChild = oldProps.child

    const newKey = keyOf(newProps.child)
    const oldKey = keyOf(oldProps.child)

    // A remove animation is already playing, leave it and rely on it to then introduce the most recent child
    if (isPlayingRemoveAnimation) return

    // Stable child; nothing to do but update with the new reference
    if (newKey === oldKey)
      return update(state, { activeChild: newProps.child })

    // Child changed: Play animations
    if (oldChild && oldChild.elm) {
      isPlayingRemoveAnimation = true

      props().animations.remove(oldChild.elm, () => {
        msg.send(setActiveChild(props().child))
        isPlayingRemoveAnimation = false
      })
    }
    else {
      msg.send(setActiveChild(newChild))
    }
  })


  on(setActiveChild, (state, node) => {
    Render.scheduleDOMWrite(() => {
      if (node && node.elm) props().animations.create(node.elm)
    })

    return update(state, { activeChild: node })
  })

}

function render({ state }: RenderParams<Props, State>) {
  return state.activeChild
}

function keyOf(node: VNode | undefined) {
  return node && (node.key || node.sel)
}


interface Animations {
  create: (elm: Element) => void
  remove: (elm: Element, cb: Function) => void
}