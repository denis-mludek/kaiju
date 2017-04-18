const styles = require('./fade.styl')

import animate from 'widget/animation/single/singleAnimation'


const fade = {
  create: (elm: Element) => {
    elm.classList.remove(styles.fadeout)
    elm.classList.add(styles.fadein)
  },

  remove: (elm: Element, cb: () => void) => {
    elm.classList.remove(styles.fadein)
    elm.classList.add(styles.fadeout)
    elm.addEventListener('animationend', cb)
  }
}

export default animate(fade)
