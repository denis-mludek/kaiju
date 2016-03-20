import h = require('snabbdom/h');
import { component } from 'dompteuse';

import { contentAnimation } from './animation';
import store, { State as GlobalState } from './store';
import { incrementRed } from './action';


export default function() {
  return component({
    key: 'red',
    store,
    readState,
    render,
    hook: contentAnimation
  });
};

interface State {
  count: number
}

function readState(state: GlobalState): State {
  return {
    count: state.blue.red.count
  };
}

function render(state: State) {
  const { count } = state;

  return h('div#red', [
    h('div.increment', [
      h('span', `Count: ${count}`),
      h('button', { on: { click: incrementRedBy10 } }, 'Increment')
    ])
  ]);
}

function incrementRedBy10() {
  incrementRed(10);
}
