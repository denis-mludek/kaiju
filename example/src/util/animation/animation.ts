import { h, VNode } from 'kaiju'
import { Set } from '../obj'


/* Container animating its children in and out. children must have keys to be properly differentiated */

export default function animate(animations: Animations) {
  return function(sel: string, children: VNode[]) {
    const props = {
      key: 'animationHook',
      animations,
      hook: { prepatch }
    }
    return h(sel, props, children)
  }
}

function prepatch(oldVNode: VNode, newVNode: VNode) {
  const animations = newVNode.data['animations'] as Animations

  const oldChildren = oldVNode.children || []
  const newChildren = newVNode.children || []

  const oldKeys = Set(oldChildren.map(c => c.key || ''))
  const newKeys = Set(newChildren.map(c => c.key || ''))

  // children making an exit
  oldChildren.forEach(child => {
    if (newKeys[child.key || '']) return

    child.data.hook = child.data.hook || {}

    const otherHook = child.data.hook.remove
    child.data.hook.remove = (vnode: VNode, cb: Function) => {
      otherHook && otherHook(vnode, () => {})
      animations.remove(vnode, cb)
    }
  })

  // children making an entrance
  newChildren.forEach(child => {
    if (oldKeys[child.key || '']) return

    child.data.hook = child.data.hook || {}

    const otherHook = child.data.hook.create
    child.data.hook.create = (emptyNode: VNode, vnode: VNode) => {
      otherHook && otherHook(emptyNode, vnode)
      animations.create(emptyNode, vnode)
    }
  })
}

interface Animations {
  create: (empty: VNode, vnode: VNode) => void
  remove: (vnode: VNode, cb: Function) => void
}
