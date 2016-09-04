import { Vnode } from 'kaiju'
import * as anime from 'animejs'
import animate from './animation'


const sectionAnimations = {
  create: (empty: Vnode, vnode: Vnode) => {
    vnode.elm.style.opacity = '0'
    anime({
      targets: vnode.elm,
      duration: 300,
      opacity: [0, 1],
      translateY: ['-20px', '0px'],
      easing: 'easeOutQuad'
    })
  },

  remove: (vnode: Vnode, cb: Function) => {
    cb()
  }
}


export default animate(sectionAnimations)
