import { h } from 'dompteuse'
import { TweenLite } from './gsap'
import { Vnode } from 'dompteuse'

/* Container animating its children in and out */

export default function animate(animations: Animations) {
  return function(sel: string, child: Vnode[]) {
    const props: any = {
      key: 'animationHook',
      animations,
      hook: { prepatch, postpatch }
    }
    return h(sel, props, child)
  };
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

const duration = 0.2
const contentAnimations = {
  create: (elm: HTMLElement) => {
    elm.style.display = 'none'
    TweenLite.from(elm, duration, { opacity: 0, delay: duration + 0.02, overwrite: true })
      .eventCallback('onStart', () => elm.style.removeProperty('display'))
  },

  remove: (vnode: Vnode, cb: Function) => {
    TweenLite.to(vnode.elm, duration, { opacity: 0, overwrite: true })
      .eventCallback('onComplete', cb)
  }
};

export const contentAnimation = animate(contentAnimations)
