import { Vnode } from 'kaiju'
import anime from 'animejs'
import animate from './animation'


const createDuration = 240
const removeDuration = 100
export const createDelay = removeDuration + 20


const fadeAnimations = {
  create: (empty: Vnode, vnode: Vnode) => {
    vnode.elm.style.display = 'none'

    anime(vnode.elm, {
      duration: createDuration,
      opacity: [0, 1],
      delay: createDelay,
      begin: () => vnode.elm.style.removeProperty('display')
    })
  },

  remove: (vnode: Vnode, cb: Function) => {
    anime(vnode.elm, {
      duration: removeDuration,
      opacity: [1, 0],
      complete: cb
    })
  }
}


export default animate(fadeAnimations)
