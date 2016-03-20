import h = require('snabbdom/h');
import { component } from 'dompteuse';

import { contentAnimation } from './animation';
import store, { State as GlobalState } from './store';


export default function() {
  return component({
    key: 'green',
    store,
    readState,
    render,
    hook: contentAnimation
  });
};

interface State {
  id: string
}

function readState(state: GlobalState): State {
  return {
    id: state.route.params['id']
  };
}

function render(state: State) {
  const { id } = state;
  return h('div#green', `Green (route id = ${id})`);
}
