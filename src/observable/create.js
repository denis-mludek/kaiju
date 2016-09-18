

export default function Observable(activate) {

  function obs() {
    return (obs._lastValue === UNSET ? undefined : obs._lastValue)
  }

  obs._subscribers = []
  obs._activate = activate
  obs._lastValue = UNSET

  // Pre-bind _add as it's called in detached mode
  obs._add = (val, name) => {
    obs._lastValue = val
    obs._parentName = name

    pushNewValue(val, obs._subscribers, obs._name || name)
  }

  const protoKeys = Object.keys(proto)
  for (let i = 0; i < protoKeys.length; i++) {
    obs[protoKeys[i]] = proto[protoKeys[i]]
  }

  return obs
}

/* Standard public API */

export const proto = {

  subscribe: function(cb) {
    const self = this
    const { _subscribers, _add, _activate, _name, _parentName } = this

    if (_subscribers.length === 0)
      this._unsubscribe = _activate(_add)

    _subscribers.push(cb)

    if (this._lastValue !== UNSET)
      cb(this._lastValue, _name || _parentName)

    return function _unsubscribe() {
      const index = _subscribers.indexOf(cb)

      if (index > -1) {
        _subscribers.splice(index, 1)

        if (_subscribers.length === 0)
          self._unsubscribe && self._unsubscribe()
      }
    }
  },

  named: function(name) {
    this._name = name
    return this
  }

}


function pushNewValue(value, subscribers, name) {
  for (let i = 0; i < subscribers.length; i++) {
    subscribers[i](value, name)
  }
}


// Internal marker
const UNSET = {}
