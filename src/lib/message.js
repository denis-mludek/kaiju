
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
  return PartiallyAppliedMessage(this, payload)
}

function messageIs(ofType) {
  return this._id === ofType._id
}

/** Creates a new Message type that is partially applied with a payload */
function PartiallyAppliedMessage(message, payload) {

  function result(maybeOtherPayload) {
    return message(arguments.length !== 0 ? [payload, maybeOtherPayload] : payload)
  }

  result.type = 'partiallyAppliedMessage'
  result.payload = payload

  return result
}


Message.unhandled = Message('unhandled')