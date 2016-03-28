import { GlobalStore, Action } from 'fluxx';
import { StateWithParams } from 'abyssa';
import update from 'immupdate';

import { incrementBlue, routeChanged } from './action';


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

export default GlobalStore(initialState, on => {
  on(incrementBlue, state =>
    update(state, { blue: { count: (c: number) => c + 1 } })
  );

  on(routeChanged, (state, route) =>
    update(state, { route })
  );
});
