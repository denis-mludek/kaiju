import * as styles from './link.styl'

import { h } from 'kaiju'
import * as cx from 'classnames'

import { Route, link as makeLink } from '../../router'


interface LinkProps<P> {
  route: Route<P>
  isActive?: boolean
  params?: P
  label: string
}

export default function link<P>({ route, params, label, isActive = false }: LinkProps<P>) {
  const href = makeLink(route.uri, params)
  const className = cx(styles.link, { [styles.active]: isActive })

  return (
    h('a', {
      props: { className },
      attrs: { href, 'data-nav': 'mousedown' }
    }, label)
  )
}
