import { VNode } from 'kaiju'

import animate from 'widget/animation/animation'


const groupFadeAnimations = {
  create: (empty: VNode, vnode: VNode) => {
    vnode.elm.animate(
      { opacity: [0, 1], transform: ['scale(0.7)', 'scale(0.7)'] },
      { duration: 300, easing: 'cubic-bezier(0.2, 0.6, 0.3, 1)', fill: 'forwards' }
    )
  },

  remove: (vnode: VNode, cb: Function) => {
    vnode.elm.animate(
      { opacity: [1, 0], transform: ['scale(1)', 'scale(0.7)'] },
      { duration: 300, easing: 'cubic-bezier(0.2, 0.6, 0.3, 1)', fill: 'forwards' }
    ).onfinish = cb
  }
}


export default animate(groupFadeAnimations)
