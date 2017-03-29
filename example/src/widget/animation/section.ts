import { VNode } from 'kaiju'

import animate from 'widget/animation/animation'


const sectionAnimations = {
  create: (_: VNode, vnode: VNode) => {
    vnode.elm.animate(
      { opacity: [0, 1], transform: ['translateY(-20px)', 'translateY(0)'] },
      { duration: 300, easing: 'ease-out', fill: 'forwards' }
    )
  },

  remove: (_: VNode, cb: Function) => {
    cb()
  }
}


export default animate(sectionAnimations)
