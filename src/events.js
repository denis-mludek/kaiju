
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

    if (old !== current)
      vnode.elm[name.toLowerCase()] = function(evt) {
        const [msg, arg] = Array.isArray(current) ? current : [current, evt]
        _sendToElement(evt.target, msg(arg))
      }
  }

  if (!oldEvents) return

  for (name in oldEvents) {
    if (events[name] == null)
      vnode.elm[name.toLowerCase()] = null
  }
}

export const snabbdomModule = {
  create: updateEventListeners,
  update: updateEventListeners
}
