import defaultLog from './log';

let eventId = 1;

/* User-defined component event factory */
export default function Event(name) {

  const _id = eventId++;

  function event(payload) {
    if (defaultLog.stream)
      console.log('%c' + event._name, 'color: #FAACF3', 'dispatched with payload ', payload);

    return { _id, payload };
  }

  event._id = _id;
  event._name = name;
  event._isCustomEvent = true;

  return event;
}
