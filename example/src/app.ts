import { api as router } from 'abyssa';
import { Component, h } from 'dompteuse';

import appState, { incrementBlue } from './appState';
import index from './index';
import blue from './blue';


export default Component({
  key: 'app',
  state,
  render
});

interface State {
  count: number,
  route: string
}

function state(dom: any) {
  return appState.map(s => ({
    count: s.blue.count,
    route: s.route.fullName
  }));
}

function render(state: State) {
  return h('div', [
    h('header', [
      h('a', { attrs: { href: router.link('app.index'), 'data-nav': 'mousedown' } }, 'Index'),
      h('a', { attrs: { href: router.link('app.blue', { id: 33 }), 'data-nav': 'mousedown' } }, 'Blue'),
      String(state.count)
    ]),
    h('main', getChildren(state.route))
  ]);
}

function getChildren(route: string) {
  if (route === 'app.index') return [index()];
  if (route.indexOf('app.blue') === 0) return [blue()];
}

setInterval(incrementBlue, 2500);
