import { h, VNode } from 'kaiju'
import lift from 'space-lift'


/**
 * Container animating its children in and out.
 * children must have keys to be properly differentiated.
 * The exit and enter animations run in parallel.
 */
export default function animate(animations: Animations) {
  return (children: VNode[], sel: string) => {
    const props = {
      key: 'groupAnimation',
      animations,
      hook: { prepatch }
    }
    return h(sel, props, children)
  }
}

function prepatch(oldVNode: VNode, newVNode: VNode) {
  const animations = newVNode.data.animations as Animations

  const oldChildren = oldVNode.children || []
  const newChildren = newVNode.children || []

  const oldKeys = lift(oldChildren).map(c => c.key || '').toSet().value()
  const newKeys = lift(newChildren).map(c => c.key || '').toSet().value()

  // children making an exit
  oldChildren.forEach(child => {
    if (newKeys[child.key || '']) return

    child.data.hook = child.data.hook || {}

    const otherHook = child.data.hook.remove
    child.data.hook.remove = (vnode: VNode.Assigned, cb: Function) => {
      if (otherHook) otherHook(vnode, noop)
      animations.remove(vnode.elm, cb)
    }
  })

  // children making an entrance
  newChildren.forEach(child => {
    if (oldKeys[child.key || '']) return

    child.data.hook = child.data.hook || {}

    const otherHook = child.data.hook.create
    child.data.hook.create = (emptyNode: {}, vnode: VNode.Assigned) => {
      if (otherHook) otherHook(emptyNode, vnode)
      animations.create(vnode.elm)
    }
  })
}

interface Animations {
  create: (elm: Element) => void
  remove: (elm: Element, cb: Function) => void
}

function noop() {}
