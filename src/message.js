import defaultLog from './log';


let messageId = 1;

/* User-defined component message factory */
export default function Message(name) {

  const _id = messageId++;

  function message(payload) {
    if (defaultLog.stream)
      console.log('%c' + name, 'color: #FAACF3', 'dispatched with payload ', payload);

    return { _id, _name: name, payload };
  }

  message._id = _id;
  message._name = name;
  message._isMessage = true;

  // Allows Actions to be used as Object keys with the correct behavior
  message.toString = () => _id;

  return message;
}
