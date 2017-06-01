import { h } from 'kaiju'

import { RouteDef } from 'route'


export default RouteDef('notFound', {
  enter: () => () => h('h1', { key: 'notFound' }, '404 :-('),
  children: {}
})