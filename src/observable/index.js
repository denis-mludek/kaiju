
import log from '../log'


function create(activate) {
  const subscribers = []

  let unsubscribe
  let lastValue = UNSET
  let lastName
  let _name

  function add(val, name) {
    lastValue = val
    lastName = name
    pushNewValue(val, subscribers, _name || name)
  }

  function subscribe(cb) {
    // The first subscriber activate the observable (laziness)
    if (subscribers.length === 0)
      unsubscribe = activate(add)

    subscribers.push(cb)

    if (lastValue !== UNSET)
      cb(lastValue, _name || lastName)

    return function _unsubscribe() {
      const index = subscribers.indexOf(cb)

      if (index > -1) {
        subscribers.splice(index, 1)

        if (subscribers.length === 0)
          unsubscribe && unsubscribe()
      }
    }
  }

  const observable = function() {
    return (lastValue === UNSET ? undefined : lastValue)
  }

  observable.subscribe = subscribe

  observable.named = name => {
    _name = name
    return observable
  }

  return observable
}

function pushNewValue(value, subscribers, name) {
  for (let i = 0; i < subscribers.length; i++) {
    subscribers[i](value, name)
  }
}

// Marker
const UNSET = {}

const Observable = { create }

export default Observable
