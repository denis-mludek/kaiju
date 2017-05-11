import { Set } from './util'
import { _sendToElement } from './messages'


/* snabbdom module extension used to register Messages as event listeners */

function updateEventListeners(oldVnode, vnode) {
  const oldEvents = oldVnode.data.events
  const events = vnode.data.events

  if (!events) return

  const listeners = oldEvents ? oldEvents.listeners : {}
  events.listeners = listeners

  for (name in events) {
    const current = events[name]
    const old = oldEvents && oldEvents[name]

    if (current && current !== old) {

      if (old && isSameMessageAndPayload(
        current,
        current.payload,
        old,
        old.payload)) continue

      listeners[name] = evt => _sendToElement(evt.currentTarget, current(evt))
      vnode.elm.addEventListener(name, listeners[name])
    }
  }

  if (!oldEvents) return

  for (name in oldEvents) {
    if (events[name] === undefined)
      vnode.elm.removeEventListener(name, listeners[name])
  }
}

function isSameMessageAndPayload(message, payload, oldMessage, oldPayload) {
  return (message._id === oldMessage._id) && (payload === oldPayload)
}

export const eventsModule = {
  create: updateEventListeners,
  update: updateEventListeners
}
