/* Opt-in, convenience construct used to update a global stream imperatively and in a type safe fashion */

import most from 'most';
import defaultLog from './log';

let actionId = 1;
const pushStreams = [];


export function Action(name) {

  function action(payload) {
    if (!pushStreams.length)
      throw new Error(`Tried to dispatch an action (${action._name}) without an instanciated PushStream`);

    if (defaultLog.stream)
      console.log('%c' + action._name, 'color: #F51DE3', 'dispatched with payload ', payload);

    pushStreams.forEach(s => s.handleAction(action, payload));
  }

  action._id = actionId++;
  action._name = name;

  // Allows Actions to be used as Object keys with the correct behavior
  action.toString = () => action._id;

  return action;
}

/*
 * A stream piloted by type-safe actions. Meant to be a global (application wide), never ending stream.
 */
export function ActionStream(initialState, registerActions, log) {
  if (log === undefined) log = defaultLog.stream;

  const instance = {};
  const handlers = {};
  let dispatching = false;

  const on = (action, fn) => { handlers[action._id] = fn }
  registerActions(on);

  if (instance.log)
    console.log('%cInitial state:', 'color: green', initialState);

  const stream = most.create((add, end, error) => {
    pushStreams.push(instance);

    instance.handleAction = function(action, payload) {
      // TODO: Is it even useful to prevent redispatching since we have async redraws? We could push to a temp queue.
      // The scenario would be: in the middle of an Action handling, we want to conditionally dispatch another action.
      if (dispatching) throw new Error(
        'Cannot dispatch an Action in the middle of another Action\'s dispatch');

      // Bail fast if this stream isn't interested.
      const handler = handlers[action._id];
      if (!handler) return;

      dispatching = true;

      let newState;

      try {
        newState = handler(stream.value, payload);
      }
      finally {
        if (instance.log)
          console.log(`%cNew PushStream state:`, 'color: blue', newState);

        dispatching = false;
      }

      if (newState !== stream.value) {
        stream.value = newState;
        add(newState);
      }
    }
  })

  stream.value = initialState;
  stream.drain();

  return stream;
}
