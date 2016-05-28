import { StateWithParams, Router, State } from 'abyssa'
import update from 'immupdate'
import { Message, GlobalStream } from 'dompteuse'


export const incrementBlue = Message('incrementBlue')
export const routeChanged = Message<StateWithParams>('routeChanged')


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

router.transition.on('ended', state => stream.send(routeChanged(state)))


const initialState: AppState = {
  route: router.current(),
  blue: { count: 0 }
}

const stream = GlobalStream<AppState>(initialState, on => {
  on(incrementBlue, state =>
    update(state, { blue: { count: (c: number) => c + 1 } })
  )

  on(routeChanged, (state, route) =>
    update(state, { route })
  )
})

export default stream
