
var messageId = 1;

/** User-defined component message factory */
export default function Message(name) {
  var _id = messageId++;

  function message() {
    for (var _len = arguments.length, payload = Array(_len), _key = 0; _key < _len; _key++) {
      payload[_key] = arguments[_key];
    }

    var result = {
      _id: _id,
      _name: name,
      payload: payload
    };
    result.is = messageIs;
    return result;
  }

  message._id = _id;
  message._name = name;
  message._isMessage = true;
  message.with = withPayload;

  return message;
}

function withPayload(payload) {
  return PartiallyAppliedMessage(this, payload);
}

function messageIs(ofType) {
  return this._id === ofType._id;
}

/** Creates a new Message type that is partially applied with a payload */
function PartiallyAppliedMessage(underlyingMessage, payload) {

  function message() {
    for (var _len2 = arguments.length, otherPayloads = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      otherPayloads[_key2] = arguments[_key2];
    }

    return underlyingMessage.apply(null, [payload].concat(otherPayloads));
  }

  message.type = 'partiallyAppliedMessage';

  message._id = underlyingMessage._id;
  message._name = underlyingMessage._name;
  message._isMessage = true;

  message.with = withPayload;

  // Used for VDOM Diffing (See util/shallowEqual)
  message.payload = payload;

  return message;
}

Message.unhandled = Message('unhandled');