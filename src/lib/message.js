
let messageId = 1

/** User-defined component message factory */
export default function Message(name) {
  const _id = messageId++

  function message(payload) {
    const result = { _id, _name: name, payload }
    result.is = messageIs
    return result
  }

  message._id = _id
  message._name = name
  message._isMessage = true
  message.with = withPayload

  return message
}

function withPayload(payload) {
  return MessageWith(this, payload)
}

function messageIs(ofType) {
  return this._id === ofType._id
}

/** Creates a new Message type that binds its payload */
function MessageWith(message, payload) {
  
  function result(maybeEvent) {
    return message(maybeEvent ? [maybeEvent, payload] : payload)
  }

  result._id = message._id
  result._name = message._name
  result._isMessage = true
  result._type = 'messageWith'
  result.payload = payload

  return result
}


Message.unhandled = Message('unhandled')