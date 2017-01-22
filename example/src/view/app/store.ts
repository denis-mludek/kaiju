import { update as copy } from 'immupdate'
import { Message } from 'kaiju'
import Store, { Store as StoreType } from 'kaiju/store'


export const incrementCounter = Message('incrementCounter')


export interface App {
  blue: {
    count: number
  }
}

const initState: App = {
  blue: { count: 0 }
}

export type AppStore = StoreType<App>

export default function() {

  return Store(initState, on => {

    on(incrementCounter, state => {
      const count = state.blue.count
      return copy(state, { blue: { count: count + 1 } })
    })

  }, { name: 'appStore' })
}
