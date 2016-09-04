import { Vnode } from 'kaiju'
import anime from 'animejs'
import animate from './animation'


const createDuration = 240
const removeDuration = 100
export const createDelay = removeDuration + 20


const pageAnimations = {
  create: (empty: Vnode, vnode: Vnode) => {
    vnode.elm.style.display = 'none'

    anime(vnode.elm, {
      duration: createDuration,
      delay: createDelay,
      opacity: [0, 1],
      translateX: ['40px', '0px'],
      easing: 'easeOutQuad',
      begin: () => vnode.elm.style.removeProperty('display')
    })
  },

  remove: (vnode: Vnode, cb: Function) => {
    anime(vnode.elm, {
      duration: removeDuration,
      opacity: [1, 0],
      translateX: ['0px', '40px'],
      easing: 'easeInQuad',
      complete: cb
    })
  }
}


export default animate(pageAnimations)
