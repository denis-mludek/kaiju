import { Vnode } from 'kaiju'
import animate from './animation'


const groupFadeAnimations = {
  create: (empty: Vnode, vnode: Vnode) => {
    vnode.elm.animate(
      { opacity: [0, 1], transform: ['scale(0.7)', 'scale(0.7)'] },
      { duration: 300, easing: 'cubic-bezier(0.2, 0.6, 0.3, 1)', fill: 'forwards' }
    )
  },

  remove: (vnode: Vnode, cb: Function) => {
    vnode.elm.animate(
      { opacity: [1, 0], transform: ['scale(1)', 'scale(0.7)'] },
      { duration: 300, easing: 'cubic-bezier(0.2, 0.6, 0.3, 1)', fill: 'forwards' }
    ).onfinish = cb
  }
}


export default animate(groupFadeAnimations)
