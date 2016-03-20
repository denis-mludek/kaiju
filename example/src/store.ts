import { Store, Action } from 'fluxx';
import { StateWithParams } from 'abyssa';
import update from 'immupdate';

import { incrementBlue, incrementRed, routeChanged } from './action';


export interface State {
  route: StateWithParams,
  blue: {
    count: number,
    red: {
      count: number
    }
  }
};

const initialState = {
  blue: { count: 0, red: { count: 0 } }
};

function updateStore<P>(state: State, action: Action<P>): State {

  if (action.is(incrementBlue)) {
    return update(state, { blue: { count: (c: number) => c + 1 } });
  }

  if (action.is(incrementRed)) {
    const { value } = action;
    return update(state, { blue: { red: { count: (c: number) => c + action.value } } });
  }

  if (action.is(routeChanged)) {
    const route = action.value;
    return update(state, { route });
  }

  return state;
}

export default Store(initialState, updateStore);
