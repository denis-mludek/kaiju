/* Opt-in, convenience construct used to update a global stream imperatively and in a type safe fashion */

import most from 'most';
import defaultLog from './log';

/*
 * A stream piloted by type-safe messages. Meant to be a global (application wide), never ending stream.
 */
export function GlobalStream(initialState, registerHandlers, log) {
  if (log === undefined) log = defaultLog.stream;

  const handlers = {};
  let dispatching = false;

  const on = (msg, fn) => { handlers[msg._id] = fn }
  registerHandlers(on);

  if (log)
    console.log('%cGlobal stream - initial state:', 'color: green', initialState);

  const stream = most.create((add, end, error) => {
    stream.send = function(message) {
      const { _id, _name, payload } = message;

      if (log)
        console.log('%c' + _name, 'color: #C93CBD', 'sent globally with payload ', payload);

      if (dispatching) throw new Error(
        'Cannot dispatch a Msg in the middle of another msg\'s dispatch');

      const handler = handlers[_id];
      if (!handler) {
        throw new Error('globalStream.send: Unknown message: ', _name);
        return;
      }

      dispatching = true;

      let newState;

      try {
        newState = handler(stream.value, payload);
      }
      finally {
        if (log)
          console.log(`%cGlobal stream - state updated:`, 'color: green', newState);

        dispatching = false;
      }

      if (newState !== stream.value) {
        stream.value = newState;
        add(newState);
      }
    }
  });

  stream.value = initialState;
  stream.drain();

  return stream;
}
