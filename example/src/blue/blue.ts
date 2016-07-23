import * as styles from './blue.styl'

import { api as router } from 'abyssa'
import { Component, h, ConnectParams, Message, Messages, Observable } from 'dompteuse'
import mergeObs from 'dompteuse/observable/merge'

import fadeAnimation from '../util/animation/fadeAnimation'
import green from './green'
import appStore, { AppState, IncrementBlue } from '../appStore'
import { merge } from '../util/obj'
import select from '../widget/select'
import link from '../widget/link'
import observeAjax from '../util/ajax'
import * as promise from '../util/promise'


export default function() {
  return Component<void, State>({ name: 'blue', initState, connect, render })
}


interface State {
  count: number
  route: string
  id: string
  users: Array<string>
  selectedUser?: string
  loading: boolean
}

function initState() {
  return mergeGlobalState({
    users: [],
    loading: false,
    selectedUser: undefined
  }, appStore.state())
}

function mergeGlobalState<S>(partialState: S, appState: AppState) {
  return merge(partialState, {
    count: appState.blue.count,
    route: appState.route.fullName,
    id: appState.route.params['id']
  })
}


const increment = Message('increment')
const userChange = Message<string>('userChange')
const refreshSelect = Message('refreshSelect')


function connect({ on, props, msg }: ConnectParams<void, State>) {

  on(increment, _ => appStore.send(IncrementBlue()))

  on(appStore.state, mergeGlobalState)

  on(userChange, (state, user) => merge(state, { selectedUser: user }))

  const ajax = observeAjax({
    name: 'users',
    callNow: true,
    trigger: msg.listen(refreshSelect),
    ajax: getUserData
  })

  on(ajax.data, (state, users) => merge(state, { users }))

  on(ajax.error, (state, err) => merge(state, { users: [] }))

  on(ajax.loading, (state, loading) => merge(state, { loading }))
}

function getUserData() {
  interface User {
    name: { first: string, last: string }
  }

  return promise.delay(2000).then(x => fetch('https://randomuser.me/api/?results=10')
    .then(res => res.json())
    .then(json => (json.results as Array<User>).map(user =>
      `${user.name.first} ${user.name.last}`)
    ))
}


function render(props: void, state: State) {
  const { id, route } = state

  const greenHref = router.link('app.blue.green', { id })
  const redHref = router.link('app.blue.red', { id })

  return (
    h('div', [
      h('h1', 'Blue screen'),
      link({ href: greenHref, label: 'Green' }),
      link({ href: redHref, label: 'Red' }),
      h('div', { props: { className: styles.increment } }, [
        'Count: ' + state.count,
        h('button', { events: { onClick: increment } }, 'Increment')
      ]),
      fadeAnimation('section', getChildren(state))
    ])
  )
}

function getChildren(state: State) {
  const { route, selectedUser, users, loading } = state

  if (route === 'app.blue') return [h('span', 'I am blue')]
  if (route === 'app.blue.green') return [green()]
  if (route === 'app.blue.red') return [
    h('div', { key: 'red', props: { className: styles.red } }, [
      h('button', { events: { onClick: refreshSelect } }, 'Refresh select list'),
      h('br'),
      select({
        items: users,
        selectedItem: selectedUser,
        onChange: userChange,
        loading
      })
    ])
  ]
  return []
}
