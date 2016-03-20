import h = require('snabbdom/h');
import { api as router } from 'abyssa';
import { component } from 'dompteuse';

import { contentAnimation } from './animation';
import green from './green';
import red from './red';
import store, { State as GlobalState } from './store';
import { incrementBlue } from './action';


export default function() {
  return component({
    key: 'blue',
    store,
    readState,
    render,
    hook: contentAnimation
  });
};

interface State {
  count: number,
  route: string,
  id: string
}

function readState(state: GlobalState): State {
  return {
    count: state.blue.count,
    route: state.route.fullName,
    id: state.route.params['id']
  };
}

function render(state: State) {
  const { id, route } = state;

  return h('div#blue', [
    h('h1', 'Blue screen'),
    h('a', { attrs: { href: router.link('app.blue.green', { id }), 'data-nav': 'mousedown' } }, 'Green'),
    h('a', { attrs: { href: router.link('app.blue.red', { id }), 'data-nav': 'mousedown' } }, 'Red'),
    h('div.increment', [
      'Count: ' + state.count,
      h('button', { on: { click: incrementBlue } }, 'Increment')
    ]),
    h('section', getChildren(route))
  ]);
}

function getChildren(route: string) {
  if (route === 'app.blue') return [h('span', { hook: contentAnimation }, 'I am blue')];
  if (route === 'app.blue.green') return [green()];
  if (route === 'app.blue.red') return [red()];
}
