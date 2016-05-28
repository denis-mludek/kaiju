import { api as router } from 'abyssa'
import { Component, h, ConnectParams, Message } from 'dompteuse'
import { Stream } from 'most'

import { contentAnimation } from './util/animation'
import green from './green'
import red from './red'
import appState, { incrementBlue } from './appState'


export default function() {
  return Component({
    key: 'blue',
    initState: readGlobalState,
    connect,
    render
  })
}

const Increment = Message('increment')

interface State {
  count: number
  route: string
  id: string
}

function readGlobalState() {
  return {
    count: appState.value.blue.count,
    route: appState.value.route.fullName,
    id: appState.value.route.params['id']
  }
}

function connect({ on, messages }: ConnectParams<void, State>) {
  messages.listen(Increment).forEach(_ => appState.send(incrementBlue()))
  on(appState, readGlobalState)
}

function render(props: void, state: State) {
  const { id, route } = state

  return h('div#blue', [
    h('h1', 'Blue screen'),
    h('a', { attrs: { href: router.link('app.blue.green', { id }), 'data-nav': 'mousedown' } }, 'Green'),
    h('a', { attrs: { href: router.link('app.blue.red', { id }), 'data-nav': 'mousedown' } }, 'Red'),
    h('div.increment', [
      'Count: ' + state.count,
      h('button', { events: { onClick: Increment } }, 'Increment')
    ]),
    contentAnimation('section', getChildren(state))
  ])
}

function getChildren(state: State) {
  const { route } = state

  if (route === 'app.blue') return [h('span', 'I am blue')]
  if (route === 'app.blue.green') return [green()]
  if (route === 'app.blue.red') return [red({ openedByDefault: true }), red()]
}
