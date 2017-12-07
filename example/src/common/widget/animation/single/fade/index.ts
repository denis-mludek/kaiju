import * as styles from './fade.less'

import animate from 'common/widget/animation/single/singleAnimation'


export const fadeInOutAnimation = {
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

export const fadeInAnimation = {
  create: fadeInOutAnimation.create,
  remove(_: Element, cb: () => void) { cb() }
}


export const fadeInOut = animate(fadeInOutAnimation)

export const fadeIn = animate(fadeInAnimation)