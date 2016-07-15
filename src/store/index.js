
import Observable from '../observable'
import log from '../lib/log'


/*
 * A Store piloted by type-safe messages. Meant to provide a global (application wide), always active observable.
 */
export default function GlobalStore(initialState, registerHandlers) {
  let state = initialState

  const store = {}
  const handlers = {}
  let dispatching = false

  const on = (msg, fn) => { handlers[msg._id] = fn }
  registerHandlers(on)

  store.state = Observable.create(add => {
    add(initialState)

    store.send = function(message) {
      const { _id, _name, payload } = message

      if (log.message)
        console.log('%c' + _name, 'color: #B31EA6', 'received by global store with payload ', payload)

      if (dispatching) throw new Error(
        'Cannot dispatch a Msg in the middle of another msg\'s dispatch')

      const handler = handlers[_id]
      if (!handler) {
        throw new Error('globalStore.send: Unknown message: ', _name)
        return
      }

      dispatching = true

      let newState

      try {
        newState = handler(state, payload)
      }
      finally {
        dispatching = false
      }

      if (newState !== state) {
        state = newState
        add(newState)
      }
    }
  }).named('GlobalStateChanged')

  // Subscribe forever
  store.state.subscribe(x => x)

  return store
}
