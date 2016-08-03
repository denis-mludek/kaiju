import { Vnode } from 'kaiju'
import anime from 'animejs'
import animate from './animation'


const fadeAnimations = {
  create: (empty: Vnode, vnode: Vnode) => {
    vnode.elm.style.display = 'none'

    anime(vnode.elm, {
      duration: 240,
      opacity: [0, 1],
      delay: 120,
      begin: () => vnode.elm.style.removeProperty('display')
    })
  },

  remove: (vnode: Vnode, cb: Function) => {
    anime(vnode.elm, {
      duration: 100,
      opacity: [1, 0],
      complete: cb
    })
  }
}


export default animate(fadeAnimations)
