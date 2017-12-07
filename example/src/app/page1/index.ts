import { RouteDef, Routes } from 'route'
import Store, { UserStore } from './store'
import view from './view'


export default function route() {

  let store: UserStore

  return RouteDef<Routes>('', {
    enter: () => {
      store = Store()
      return () => view({ store })
    },
    exit: () => {
      store.destroy()
    },
    children: {}
  })
}