import * as styles from './blue.styl'

import { Component, h, ConnectParams, Message } from 'kaiju'
import update from 'immupdate'

import fadeAnimation from '../util/animation/fadeAnimation'
import green from './green'
import appStore, { incrementBlue } from '../appStore'
import * as routes from '../router'
import select from '../widget/select'
import link from '../widget/link'
import observeAjax from '../util/ajax'
import * as promise from '../util/promise'


export default function() {
  return Component<void, State>({ name: 'blue', initState, connect, render })
}


interface State {
  count: number
  route: routes.RouteWithParams<routes.BlueParams>
  users: Array<string>
  selectedUser?: string
  loading: boolean
}

function initState() {
  return {
    count: appStore.state().blue.count,
    route: routes.current(),
    users: [],
    loading: false,
    selectedUser: undefined
  }
}


const increment = Message('increment')
const userChange = Message<string>('userChange')
const refreshSelect = Message('refreshSelect')


function connect({ on, msg }: ConnectParams<void, State>) {

  on(increment, _ => appStore.send(incrementBlue()))

  on(appStore.state, (state, appState) => update(state, { count: appState.blue.count }))

  on(routes.current, (state, route) => update(state, { route }))

  on(userChange, (state, user) => update(state, { selectedUser: user }))

  const ajax = observeAjax({
    name: 'users',
    callNow: true,
    trigger: msg.listen(refreshSelect),
    ajax: getUserData
  })

  on(ajax.data, (state, users) => update(state, { users }))

  on(ajax.error, (state, err) => update(state, { users: [] }))

  on(ajax.loading, (state, loading) => update(state, { loading }))
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
  const { route } = state
  const id = route.params['id']

  return (
    h('div', [
      h('h1', 'Blue screen'),
      link({
        route: routes.green,
        params: { id },
        label: 'Green',
        isActive: route.isIn(routes.green)
      }),
      link({
        route: routes.red,
        params: { id },
        label: 'Red',
        isActive: route.isIn(routes.red)
      }),
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

  if (route.is(routes.blue)) return [h('span', 'I am the blue screen index')]
  if (route.isIn(routes.green)) return [green({ id: route.params['id'] })]
  if (route.isIn(routes.red)) return [
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
