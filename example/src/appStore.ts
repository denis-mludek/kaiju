import { StateWithParams, Router, State } from 'abyssa'
import update from 'immupdate'
import { Message } from 'dompteuse'
import GlobalStore from 'dompteuse/store'


export const IncrementBlue = Message('IncrementBlue')
export const RouteChanged = Message<StateWithParams>('RouteChanged')


export interface AppState {
  route: StateWithParams,
  blue: {
    count: number
  }
}

const router = Router({
  app: State('', {}, {
    index: State('', {}),
    blue: State('blue/:id', {}, {
      green: State('green', {}),
      red: State('red', {})
    })
  })
})
.configure({ urlSync: 'hash' })
.init()

const initState: AppState = {
  route: router.current(),
  blue: { count: 0 }
}

const store = GlobalStore<AppState>(initState, on => {
  on(IncrementBlue, state =>
    update(state, { blue: { count: (c: number) => c + 1 } })
  )

  on(RouteChanged, (state, route) =>
    update(state, { route })
  )
})

router.transition.on('ended', state => store.send(RouteChanged(state)))


export default store
