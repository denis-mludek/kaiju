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
    const message = events[name]
    const oldMessage = oldEvents && oldEvents[name]

    if (message && message !== oldMessage) {

      if (oldMessage && isSameMessageAndPayload(message, oldMessage)) continue

      if (listeners[name])
        vnode.elm.removeEventListener(name, listeners[name])

      listeners[name] = evt => _sendToElement(evt.currentTarget, message(evt))
      vnode.elm.addEventListener(name, listeners[name])
    }
  }

  if (!oldEvents) return

  for (name in oldEvents) {
    if (events[name] === undefined)
      vnode.elm.removeEventListener(name, listeners[name])
  }
}

function isSameMessageAndPayload(message, oldMessage) {
  return (message._id === oldMessage._id) && (message.payload === oldMessage.payload)
}

export const eventsModule = {
  create: updateEventListeners,
  update: updateEventListeners
}
