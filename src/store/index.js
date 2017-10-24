import { Observable } from '../observable'
import Message from '../lib/message'
import log from '../lib/log'


/*
 * A Store is an Observable that is guaranteed to have an initial value
 * and can be modified from the outside by messages.
 */
export function Store(initialState, registerHandlers, options = empty) {
  const store = {}

  // Message handlers for the on(message) syntax
  const handlers = {}
  // unsubscribe functions created by the on(observable) syntax
  const subscriptions = []
  // List of the messages that are listened to in order to create observables
  const listened = {}
  // Dispatching queue, when a message handler sends additional messages
  const queue = []
  // Stack size while receiving a message
  let stack = 0

  let receiving = false

  const name = options.name
  const shouldLog = options.log !== undefined ? options.log : log.message === true
  const storeName = name || (registerHandlers.name ? `${registerHandlers.name} store` : 'Store')

  const msg = {
    send: m => store.send(m), // Late binding as store.send is not yet defined
    listen: message => {
      const observable = Observable().named(message._name)
      let obss = listened[message._id]
      if (!obss) obss = listened[message._id] = []
      obss.push(observable)
      return observable
    }
  }

  function on(src, fn) {
    if (src._isMessage) {
      handlers[src._id] = fn
    }
    else {
      const unsubscribe = src.subscribe((val, name) => {
        receive(name, fn, val)
      })

      subscriptions.push(unsubscribe)
    }
  }

  function receive(sourceName, handler, arg) {
    queue.push({ sourceName, handler, arg })

    if (stack >= 10) throw new Error(`Infinite loop while handling ${sourceName}`)
    if (receiving) return

    receiving = true

    let state = store.state()

    try {
      while (queue.length) {
        const { sourceName, handler, arg } = queue.shift()
        stack++

        if (shouldLog)
          console.log(
            `%c${sourceName} %creceived by %c${storeName}`,
            'color: #B31EA6', 'color: black',
            'font-weight: bold', 'with', arg
          )

        const result = handler(state, arg)
        if (result !== undefined) state = result
      }
    }
    finally {
      receiving = false
      queue.length = 0
      stack = 0
    }

    if (state !== store.state() && state !== undefined)
      store.state(state)
  }

  store.state = Observable()(initialState).named(`${storeName}.state`)
  // Eagerly activate (hot)
  store.state.subscribe(x => x)

  registerHandlers(on, msg)

  store.send = function(message) {
    const { _id, _name, payload } = message
    const handler = handlers[_id]
    let handled = false

    if (handler) {
      receive(_name, handler, payload)
      handled = true
    }

    const obss = listened[_id]

    if (obss) {
      obss.forEach(obs => obs(payload))
      handled = true
    }

    if (handled) return

    const unhandled = handlers[Message.unhandled._id]

    if (unhandled) {
      receive(Message.unhandled._name, unhandled, message)
      return
    }

    console.warn(`Unhandled message "${_name}" at %c${storeName}`, 'font-weight: bold')
  }

  store.destroy = function() {
    store.state._subscribers.length = 0
    store.state.subscribe = noop
    store.send = noop
    subscriptions.forEach(fn => fn())
    subscriptions.length = 0
  }

  return store
}

const empty = {}
function noop() {}
