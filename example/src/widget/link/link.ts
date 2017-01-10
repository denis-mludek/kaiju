const styles = require('./link.styl')

import { h } from 'kaiju'

import router, { RouteDef } from 'router'


interface LinkProps<P> {
  route: RouteDef<P, {}>
  isActive?: boolean
  params?: P
  label: string
}

export default function link<P>({ route, params, label, isActive = false }: LinkProps<P>) {
  const href = router.link(route, params)

  return (
    h('a', {
      class: { [styles.link]: true, [styles.active]: isActive },
      attrs: { href, 'data-nav': 'mousedown' }
    }, label)
  )
}
