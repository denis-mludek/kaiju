import { StateWithParams, Router, State } from 'abyssa';
import update from 'immupdate';
import { Action, ActionStream } from 'dompteuse';


export const incrementBlue = Action('incrementBlue');
export const routeChanged = Action<StateWithParams>('routeChanged');


export interface AppState {
  route: StateWithParams,
  blue: {
    count: number
  }
};

const router = Router({
  app: State('', {}, {
    index: State('', {}),
    blue: State('blue/:id', {}, {
      green: State('green', {}),
      red: State('red', {})
    })
  })
})
.configure({ urlSync: 'hash' })
.init();

router.transition.on('ended', routeChanged);


const initialState: AppState = {
  route: router.current(),
  blue: { count: 0 }
};

export default ActionStream<AppState>(initialState, on => {
  on(incrementBlue, state =>
    update(state, { blue: { count: (c: number) => c + 1 } })
  );

  on(routeChanged, (state, route) =>
    update(state, { route })
  );
});
