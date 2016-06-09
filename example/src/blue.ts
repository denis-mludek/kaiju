import { api as router } from 'abyssa'
import { Component, h, ConnectParams, Message, Messages } from 'dompteuse'
import * as most from 'most'
import { Stream } from 'most'

import { contentAnimation } from './util/animation'
import green from './green'
import appState, { incrementBlue } from './appState'
import { merge } from './util/obj'
import select from './util/select'


export default function() {
  return Component({
    key: 'blue',
    initState,
    connect,
    render
  })
}


const Increment = Message('increment')
const UserChange = Message<string>('userChange')
const RefreshSelect = Message('refreshSelectList')


interface State {
  count: number
  route: string
  id: string
  users: Array<string>
  selectedUser: string
  loading: boolean
}

function initState() {
  return merge({ users: [], loading: true }, readGlobalState())
}

function readGlobalState() {
  return {
    count: appState.value.blue.count,
    route: appState.value.route.fullName,
    id: appState.value.route.params['id']
  }
}

function connect({ on, messages }: ConnectParams<void, State>) {
  on(Increment, _ => appState.send(incrementBlue()))

  on(appState, state => merge(state, readGlobalState()))

  on(UserChange, (state, user) => merge(state, { selectedUser: user }))

  const [userData, loading] = getUserData(messages)
  on(userData, (state, users) => merge(state, { users }))
  on(loading, (state, loading) => merge(state, { loading }))
}

function getUserData(messages: Messages): [Stream<string[]>, Stream<boolean>] {

  function getSomeUsers() {
    interface User {
      name: { first: string, last: string }
    }

    return most.fromPromise(fetch('https://randomuser.me/api/?results=10')
      .then(res => res.json())
      .then(json => (json.results as Array<User>).map((user: any) =>
        `${user.name.first} ${user.name.last}`)
      )
    ).delay(2000)
  }

  const refreshes = messages.listen(RefreshSelect).multicast()
  const userData = refreshes
    .map(getSomeUsers)
    .startWith(getSomeUsers())
    .switch()
    .multicast()

  const loading = most.merge(refreshes.constant(true), userData.constant(false))

  return [userData, loading]
}

function render(props: void, state: State) {
  const { id, route } = state

  return h('div#blue', [
    h('h1', 'Blue screen'),
    h('a', { attrs: {
      href: router.link('app.blue.green', { id }),
      'data-nav': 'mousedown'
    } }, 'Green'),
    h('a', {
      attrs: { href: router.link('app.blue.red', { id }),
      'data-nav': 'mousedown'
    } }, 'Red'),
    h('div.increment', [
      'Count: ' + state.count,
      h('button', { events: { onClick: Increment } }, 'Increment')
    ]),
    contentAnimation('section', getChildren(state))
  ])
}

function getChildren(state: State) {
  const { route, selectedUser, users, loading } = state

  if (route === 'app.blue') return [h('span', 'I am blue')]
  if (route === 'app.blue.green') return [green()]
  if (route === 'app.blue.red') return [
    h('div.red', { key: 'red' }, [
      h('button', { events: { onClick: RefreshSelect } }, 'Refresh select list'),
      h('br'),
      select({
        items: users,
        selectedItem: selectedUser,
        onChange: UserChange,
        loading
      })
    ])
  ]
}
