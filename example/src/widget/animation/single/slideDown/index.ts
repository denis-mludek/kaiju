const styles = require('./slideDown.styl')

import animate from 'widget/animation/single/singleAnimation'


const slideDown = {
  create(elm: Element) {
    elm.classList.add(styles.slideDown)
  },

  remove(_: Element, cb: Function) {
    cb()
  }
}


export default animate(slideDown)
