import { Vnode } from 'kaiju'
import animate from './animation'


let onRemoved: Function

const pageAnimations = {
  create: (empty: Vnode, vnode: Vnode) => {
    vnode.elm.style.display = 'none'

    onRemoved = () => {
      vnode.elm.style.removeProperty('display')
      vnode.elm.animate(
        { opacity: [0, 1], transform: ['translateX(30px)', 'translateX(0)'] },
        { duration: 300, easing: 'cubic-bezier(0.2, 0.6, 0.3, 1)', fill: 'forwards' }
      )
    }
  },

  remove: (vnode: Vnode, cb: Function) => {
    vnode.elm.animate(
      { opacity: [1, 0], transform: ['translateX(0)', 'translateX(30px)'] },
      { duration: 150, easing: 'linear', fill: 'forwards' }
    )
    .onfinish = () => {
      cb()
      onRemoved()
    }
  }
}


export default animate(pageAnimations)
