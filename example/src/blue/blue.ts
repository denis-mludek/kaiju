import * as styles from './blue.styl'

import { Component, h, ConnectParams, RenderParams, Message } from 'kaiju'
import update from 'immupdate'

import fadeAnimation from '../util/animation/fadeAnimation'
import green from './green'
import appStore, { incrementBlue } from '../appStore'
import * as routes from '../router'
import select from '../widget/select'
import link from '../widget/link'
import { getUserData } from './data'


export default function(props: Props) {
  return Component<Props, State>({ name: 'blue', initState, connect, props, render })
}

interface Props {
  route: routes.RouteWithParams<routes.BlueParams>
}

interface State {
  count: number
  users: Array<string>
  selectedUser?: string
  loading: boolean
}

function initState() {
  return {
    count: appStore.state().blue.count,
    users: [],
    loading: false,
    selectedUser: undefined
  }
}


const increment = Message('increment')
const userChange = Message<string>('userChange')
const refreshSelect = Message('refreshSelect')


function connect({ on, msg }: ConnectParams<Props, State>) {

  on(increment, _ => appStore.send(incrementBlue()))

  on(appStore.state, (state, appState) => update(state, { count: appState.blue.count }))

  on(userChange, (state, user) => update(state, { selectedUser: user }))

  const users = getUserData(msg, refreshSelect)
  on(users.data, (state, users) => update(state, { users }))
  on(users.error, (state, err) => update(state, { users: [] }))
  on(users.loading, (state, loading) => update(state, { loading }))
}

function render({ props, state }: RenderParams<Props, State>) {
  const { route } = props
  const id = route.params.id

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
      fadeAnimation('section', getChildren(props, state))
    ])
  )
}

function getChildren(props: Props, state: State) {
  const { route } = props
  const { selectedUser, users, loading } = state

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
