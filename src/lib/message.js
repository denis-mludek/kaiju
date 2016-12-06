
let messageId = 1

/* User-defined component message factory */
export default function Message(name) {

  const _id = messageId++

  function message(payload) {
    return { _id, _name: name, payload }
  }

  message._id = _id
  message._name = name
  message._isMessage = true

  message.with = payload => [message, payload]

  return message
}
