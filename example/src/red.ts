import h = require('snabbdom/h');
import update from 'immupdate';
import { LocalStore, Action, NoArgAction } from 'fluxx';
import { component } from 'dompteuse';

import { contentAnimation } from './animation';


export default function(props?: Props) {
  return component({
    key: 'red',
    localStore,
    props,
    render
  });
};

// Props passed by our parent
interface Props {
  openedByDefault: boolean;
}

// Our local state
interface State {
  opened: number;
}

// Actions modifying our local state
interface Actions {
  toggle: NoArgAction
}

function localStore({ openedByDefault }) {
  const initialState = { opened: openedByDefault };

  const actions = {
    toggle: Action<number>('toggle')
  };

  const store = LocalStore(initialState, on => {
    on(actions.toggle, state => update(state, { opened: !state.opened }))
  });

  return { store, actions };
}

function render(options: { localState: State, actions: Actions }) {
  const { localState: { opened }, actions } = options;

  return h('div.red', { hook: contentAnimation, class: { opened } }, [
    h('button', { on: { click: onClick(actions) } }, 'Toggle')
  ]);
}

function onClick(actions: Actions) {
  return () => actions.toggle()
}
