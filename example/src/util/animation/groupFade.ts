import { Vnode } from 'kaiju'
import anime from 'animejs'
import animate from './animation'


const groupFadeAnimations = {
  create: (empty: Vnode, vnode: Vnode) => {
    const height = vnode.elm.clientHeight

    anime(vnode.elm, {
      duration: 100,
      height: [0, height],
      easing: 'easeOutQuad',
      complete: () => {
        anime(vnode.elm, {
          duration: 150,
          opacity: [0, 1],
          easing: 'easeOutQuad'
        })
      }
    })
  },

  remove: (vnode: Vnode, cb: Function) => {
    const height = vnode.elm.clientHeight

    anime(vnode.elm, {
      duration: 150,
      opacity: [1, 0],
      easing: 'easeInQuad',
      complete: () => {
        anime(vnode.elm, {
          duration: 100,
          height: [height, 0],
          easing: 'easeInQuad',
          complete: cb
        })
      }
    })
  }
}


export default animate(groupFadeAnimations)
