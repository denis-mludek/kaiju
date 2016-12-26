import { h } from 'kaiju'
import { RouteDef } from '../router'


export default function route() {
  return RouteDef('', {}, {
    enter: () => () => h('h1', 'Index'),
    children: {}
  })
}
