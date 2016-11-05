const styles = require('./blue.styl')

import { Component, h, ConnectParams, RenderParams, Message } from 'kaiju'
import update from 'immupdate'

import sectionAnimation from '../../util/animation/section'
import green from './green'
import appStore, { incrementBlue } from '../../appStore'
import * as routes from '../../router'
import { RouteWithParams } from '../../router'
import select from '../../widget/select'
import link from '../../widget/link'
import { getUserData } from './data'


export default function(props: Props) {
  return Component<Props, State>({ name: 'blue', initState, connect, props, render })
}


interface Props {
  route: RouteWithParams<typeof routes.blue.params>
}

interface State {
  count: number
  users: Array<string>
  selectedUser?: string
  loading: boolean
}


function initState() {
  return {
    count: undefined!,
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
      h(`div.${styles.increment}`, [
        'Count: ' + state.count,
        h('button', { events: { click: increment } }, 'Increment')
      ]),
      sectionAnimation('section', getChildren(route, state))
    ])
  )
}

function getChildren(route: RouteWithParams<{}>, state: State) {
  const { selectedUser, users, loading } = state

  if (route.is(routes.blue)) return [h('span', 'I am the blue screen index')]
  if (route.isIn(routes.green)) return [green({ route })]
  if (route.isIn(routes.red)) return [
    h(`div.${styles.red}`, { key: 'red' }, [
      h('button', { events: { click: refreshSelect } }, 'Refresh select list'),
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
