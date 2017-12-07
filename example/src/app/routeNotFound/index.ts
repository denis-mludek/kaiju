import { h } from 'kaiju'

import { RouteDef, Routes } from 'route'


export default RouteDef<Routes>('notFound', {
  enter: () => () => h('h1', { key: 'notFound' }, '404 :-('),
  children: {}
})