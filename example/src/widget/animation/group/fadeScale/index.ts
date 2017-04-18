const styles = require('./fadeScale.styl')

import animate from 'widget/animation/group/groupAnimation'


const fadeScale = {
  create: (elm: Element) => {
    elm.classList.remove(styles.fadeScaleOut)
    elm.classList.remove(styles.fadeScaleIn)
  },

  remove: (elm: Element, cb: () => void) => {
    elm.classList.remove(styles.fadeScaleIn)
    elm.classList.add(styles.fadeScaleOut)
    elm.addEventListener('animationend', cb)
  }
}


export default animate(fadeScale)
