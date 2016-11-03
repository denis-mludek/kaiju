const styles = require('./link.styl')

import { h } from 'kaiju'

import { Route, link as makeLink } from '../../router'


interface LinkProps<P> {
  route: Route<P>
  isActive?: boolean
  params?: P
  label: string
}

export default function link<P>({ route, params, label, isActive = false }: LinkProps<P>) {
  const href = makeLink(route.fullName, params)

  return (
    h('a', {
      class: { [styles.link]: true, [styles.active]: isActive },
      attrs: { href, 'data-nav': 'mousedown' }
    }, label)
  )
}
