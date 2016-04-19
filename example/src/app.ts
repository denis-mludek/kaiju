import { api as router } from 'abyssa'
import { Component, h, DomApi, Property } from 'dompteuse'

import appState, { incrementBlue } from './appState'
import { contentAnimation } from './animation'
import index from './index'
import blue from './blue'


export default Component({
  key: 'app',
  connect,
  render
});

interface State {
  count: number
  route: string
}

function connect(dom: DomApi): Property<State> {
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
    contentAnimation('main', getChildren(state.route))
  ]);
}

function getChildren(route: string) {
  if (route === 'app.index') return [index()]
  if (route.indexOf('app.blue') === 0) return [blue()]
}

//setInterval(incrementBlue, 2500);
