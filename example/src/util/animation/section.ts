import { Vnode } from 'kaiju'
import animate from './animation'


const sectionAnimations = {
  create: (empty: Vnode, vnode: Vnode) => {
    vnode.elm.animate(
      { opacity: [0, 1], transform: ['translateY(-20px)', 'translateY(0)'] },
      { duration: 300, easing: 'ease-out', fill: 'forwards' }
    )
  },

  remove: (vnode: Vnode, cb: Function) => {
    cb()
  }
}


export default animate(sectionAnimations)
