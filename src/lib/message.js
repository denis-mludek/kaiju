
let messageId = 1

/* User-defined component message factory */
export default function Message(name) {

  const _id = messageId++

  function message(payload) {
    const _hasPayload = arguments.length !== 0
    return { _id, _name: name, _hasPayload, payload }
  }

  message._id = _id
  message._name = name
  message._isMessage = true

  message.with = payload => [message, payload]

  return message
}

Message.unhandled = Message('unhandled')
