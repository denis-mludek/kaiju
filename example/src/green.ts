import h = require('snabbdom/h');
import { component } from 'dompteuse';

import { contentAnimation } from './animation';
import { State as GlobalState } from './store';


export default function() {
  return component({
    key: 'green',
    pullState,
    render,
    hook: contentAnimation
  });
};

interface State {
  id: string
}

function pullState(state: GlobalState): State {
  return {
    id: state.route.params['id']
  };
}

function render(options: { state: State }) {
  const { state: { id } } = options;
  return h('div#green', `Green (route id = ${id})`);
}
