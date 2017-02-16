const styles = require('./loader.styl')

import { h } from 'kaiju'

const sel = `div.${styles.loader}`

export default function() {
  return h(sel)
}
