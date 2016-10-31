import { StateWithParams } from 'abyssa'
import { updateKey } from 'immupdate'
import { Message } from 'kaiju'
import Store from 'kaiju/store'


/* appStore has all the global state of our app.
   It could be split into multiple stores if it became bloated, though it probably never should */

export const incrementBlue = Message('incrementBlue')
export const routeChanged = Message<StateWithParams>('routeChanged')


export interface AppState {
  blue: {
    count: number
  }
}

const initState: AppState = {
  blue: { count: 0 }
}

export default Store(initState, on => {

  on(incrementBlue, state => {
    const count = state.blue.count
    return updateKey(state, 'blue.count', count + 1)
  })

})
