const styles = require('./link.styl')

import { h } from 'kaiju'


interface LinkProps {
  href: string
  isActive?: boolean
  label: string
}

export default function link({ href, label, isActive = false }: LinkProps) {

  return (
    h('a', {
      class: { [styles.link]: true, [styles.active]: isActive },
      attrs: { href, 'data-nav': 'mousedown' }
    }, label)
  )
}
