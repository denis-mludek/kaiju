import { RouteDef, Routes } from 'route'
import view from './view'


export default function route() {
  return RouteDef<Routes>('plop', {
    enter: () => () => view(),
    children: {}
  })
}
