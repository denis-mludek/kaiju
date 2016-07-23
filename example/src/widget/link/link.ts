import * as styles from './link.styl'

import { h } from 'dompteuse'


interface LinkProps {
  href: string
  label: string
}

export default function link({ href, label }: LinkProps) {
  return (
    h('a', {
      props: { className: styles.link },
      attrs: { href, 'data-nav': 'mousedown' }
    }, label)
  )
}
