import { h } from 'kaiju'

import { RouteDef } from 'route'


export default function route() {
  return RouteDef('', {
    enter: () => () => h('h1', 'Index'),
    children: {}
  })
}
