import * as styles from './slideDown.less'

import animate from 'common/widget/animation/single/singleAnimation'


const slideDownAnimation = {
  create(elm: Element) {
    elm.classList.add(styles.slideDown)
  },

  remove(_: Element, cb: Function) {
    cb()
  }
}


export const slideDown = animate(slideDownAnimation)
