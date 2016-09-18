import Observable from '../observable/create'
import log from '../lib/log'


/*
 * A Store is an Observable that is garanteed to have an initial value,
 * and can be modified from the outside by type-safe messages.
 */
export default function Store(initialState, registerHandlers) {
  let state = initialState

  const store = {}
  const handlers = {}
  let dispatching = false

  const on = (msg, fn) => { handlers[msg._id] = fn }
  registerHandlers(on)

  store.state = Observable(add => {
    add(initialState)

    store.send = function(message) {
      const { _id, _name, payload } = message

      if (log.message)
        console.log('%c' + _name, 'color: #B31EA6', 'received by store with payload ', payload)

      if (dispatching) throw new Error(
        'Cannot dispatch a Msg in the middle of another msg\'s dispatch')

      const handler = handlers[_id]
      if (!handler) {
        throw new Error('Store.send: Unknown message: ', _name)
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
  }).named('storeChange')

  // Eagerly activate (hot)
  store.state.subscribe(x => x)

  store.destroy = function() {
    store.state._subscribers.length = 0
    store.state.subscribe = noop
    store.send = noop
  }

  return store
}

function noop() {}
