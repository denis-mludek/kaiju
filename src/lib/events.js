import { Set } from './util'
import { _sendToElement } from './messages'


/* snabbdom module extension used to register Messages as event listeners */

function updateEventListeners(oldVnode, vnode) {
  const oldEvents = oldVnode.data.events
  const events = vnode.data.events

  if (!events) return

  for (name in events) {
    const current = events[name]
    const old = oldEvents && oldEvents[name]

    if (old !== current) {
      const listenerIsArray = Array.isArray(current)

      // The reference changed but the inner message and payload are the same
      if (listenerIsArray && old && current[0] === old[0] && current[1] === old[1]) return

      vnode.elm['on' + name] = listenerIsArray
        ? evt => _sendToElement(evt.currentTarget, current[0]([evt, current[1]]))
        : evt => _sendToElement(evt.currentTarget, current(evt))
    }
  }

  if (!oldEvents) return

  for (name in oldEvents) {
    if (events[name] == null)
      vnode.elm['on' + name] = null
  }
}

export const eventsModule = {
  create: updateEventListeners,
  update: updateEventListeners
}
