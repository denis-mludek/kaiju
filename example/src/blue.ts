import { api as router } from 'abyssa';
import { Component, h, StateApi } from 'dompteuse';

import { contentAnimation } from './animation';
import green from './green';
import red from './red';
import appState, { incrementBlue } from './appState';


export default function() {
  return Component({
    key: 'blue',
    state,
    render
  });
};

interface State {
  count: number;
  route: string;
  id: string;
}

function state(dom: StateApi) {
  dom.onEvent('.increment button', 'click').onValue(incrementBlue);

  return appState.map(state => ({
    count: state.blue.count,
    route: state.route.fullName,
    id: state.route.params['id']
  }));
}

function render(state: State) {
  const { id, route } = state;

  return h('div#blue', [
    h('h1', 'Blue screen'),
    h('a', { attrs: { href: router.link('app.blue.green', { id }), 'data-nav': 'mousedown' } }, 'Green'),
    h('a', { attrs: { href: router.link('app.blue.red', { id }), 'data-nav': 'mousedown' } }, 'Red'),
    h('div.increment', [
      'Count: ' + state.count,
      h('button', 'Increment')
    ]),
    contentAnimation('section', getChildren(state))
  ]);
}

function getChildren(state: State) {
  const { route } = state;

  if (route === 'app.blue') return [h('span', 'I am blue')];
  if (route === 'app.blue.green') return [green()];
  if (route === 'app.blue.red') return [red({ openedByDefault: true }), red()];
}
