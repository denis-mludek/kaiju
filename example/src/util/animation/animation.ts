
import { h } from 'dompteuse'
import { Vnode } from 'dompteuse'

import { Set } from '../obj'


/* Container animating its children in and out. children must have keys to be properly differentiated */

export default function animate(animations: Animations) {
  return function(sel: string, child: Vnode[]) {
    const props: any = {
      key: 'animationHook',
      animations,
      hook: { prepatch }
    }
    return h(sel, props, child)
  }
}

function prepatch(oldVnode: Vnode, newVnode: Vnode) {
  const animations = newVnode.data['animations'] as Animations

  const oldKeys = Set(oldVnode.children.map(c => c.key))
  const newKeys = Set(newVnode.children.map(c => c.key))

  // children making an exit
  oldVnode.children.forEach(child => {
    if (newKeys[child.key]) return

    child.data.hook = child.data.hook || {}

    const otherHook = child.data.hook.remove
    child.data.hook.remove = (vnode: Vnode, cb: Function) => {
      otherHook && otherHook(vnode, () => {})
      animations.remove(vnode, cb)
    }
  })

  // children making an entrance
  newVnode.children.forEach(child => {
    if (oldKeys[child.key]) return

    child.data.hook = child.data.hook || {}

    const otherHook = child.data.hook.create
    child.data.hook.create = (emptyNode: Vnode, vnode: Vnode) => {
      otherHook && otherHook(emptyNode, vnode)
      animations.create(emptyNode, vnode)
    }
  })
}

interface Animations {
  create: (empty: Vnode, vnode: Vnode) => void
  remove: (vnode: Vnode, cb: Function) => void
}
