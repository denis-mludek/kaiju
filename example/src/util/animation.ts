
import { h } from 'dompteuse'
import { Vnode } from 'dompteuse'
import anime from 'animejs'


/* Container animating its children in and out */

export default function animate(animations: Animations) {
  return function(sel: string, child: Vnode[]) {
    const props: any = {
      key: 'animationHook',
      animations,
      hook: { prepatch, postpatch }
    }
    return h(sel, props, child)
  }
}

function prepatch(oldVnode: Vnode, newVnode: Vnode) {
  for (let i = 0; i < oldVnode.children.length; i++) {
    const oldVnodeChild = oldVnode.children[i]
    const newVnodeChild = newVnode.children[i]
    const oldKey = oldVnodeChild.key
    const newKey = newVnodeChild && newVnodeChild.key

    if (oldKey !== newKey) {
      // Just replace the whole hook for now.
      // It would be cleaner to merge the hooks in.
      oldVnodeChild.data.hook = oldVnodeChild.data.hook || {}
      oldVnodeChild.data.hook.remove = (newVnode.data as any).animations.remove
    }
  }
}

function postpatch(oldVnode: Vnode, newVnode: Vnode) {
  for (let i = 0; i < newVnode.children.length; i++) {
    const oldVnodeChild = oldVnode.children[i]
    const newVnodeChild = newVnode.children[i]
    const oldKey = oldVnodeChild && oldVnodeChild.key
    const newKey = newVnodeChild.key

    if (oldKey !== newKey) {
      const createFn = (newVnode.data as any).animations.create
      createFn(newVnodeChild.elm)
    }
  }
}


interface Animations {
  create: (elm: HTMLElement) => void
  remove: (vnode: Vnode, cb: any) => void
}

const duration = 200
const contentAnimations = {
  create: (elm: HTMLElement) => {
    elm.style.display = 'none'

    anime(elm, {
      duration: 240,
      opacity: [0, 1],
      delay: 120,
      begin: () => elm.style.removeProperty('display')
    })
  },

  remove: (vnode: Vnode, cb: Function) => {

    anime(vnode.elm, {
      targets: vnode.elm,
      duration: 100,
      opacity: [1, 0],
      complete: cb
    })
  }
};

export const contentAnimation = animate(contentAnimations)
