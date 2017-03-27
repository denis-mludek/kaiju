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

      if (old && current && isSameMessageAndPayload(
        current,
        current.payload,
        old,
        old.payload)) return

      vnode.elm['on' + name] = current
        ? evt => _sendToElement(evt.currentTarget, current(evt))
        : null
    }
  }

  if (!oldEvents) return

  for (name in oldEvents) {
    if (events[name] == null)
      vnode.elm['on' + name] = null
  }
}

function isSameMessageAndPayload(message, payload, oldMessage, oldPayload) {
  return (message._id === oldMessage._id) && (payload === oldPayload)
}

export const eventsModule = {
  create: updateEventListeners,
  update: updateEventListeners
}
