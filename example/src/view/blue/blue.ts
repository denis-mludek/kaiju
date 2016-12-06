const styles = require('./blue.styl')

import { h, ConnectParams, RenderParams, Message } from 'kaiju'
import { Store } from 'kaiju/store'
import update from 'immupdate'

import sectionAnimation from '../../util/animation/section'
import { ComponentWithStores } from '../../util/vnode'
import green from './green'
import { incrementCounter, AppStore } from '../app/store'
import * as routes from '../../router'
import { RouteWithParams } from '../../router'
import select from '../../widget/select'
import link from '../../widget/link'
import userStore, { Users, UserStore, reloadUsers } from './userStore'


export default function blue(props: ParentProps) {
  return ComponentWithStores<ParentProps, State, StoreProps>(
    { name: 'blue', initState, connect, props, render },
    stores
  )
}

interface ParentProps {
  route: RouteWithParams<typeof routes.blue.params>
  appStore: AppStore
}

interface StoreProps extends Obj<Store<{}>> {
  userStore: UserStore
}

type Props = ParentProps & StoreProps

interface State {
  count: number
  users: Users
  selectedUser?: string
}


function stores() {
  return { userStore: userStore() }
}

function initState() {
  return {
    count: undefined!,
    users: undefined!,
    selectedUser: undefined
  }
}


const userChange = Message<string>('userChange')


function connect({ on, props }: ConnectParams<Props, State>) {
  const { appStore, userStore } = props()

  on(incrementCounter, _ => appStore.send(incrementCounter()))

  on(appStore.state, (state, appState) => update(state, { count: appState.blue.count }))
  on(userStore.state, (state, users) => update(state, { users }))
  on(reloadUsers, _ => userStore.send(reloadUsers()))

  on(userChange, (state, user) => update(state, { selectedUser: user }))
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
        h('button', { events: { click: incrementCounter } }, 'Increment')
      ]),
      sectionAnimation('section', getChildren(route, state))
    ])
  )
}

function getChildren(route: RouteWithParams<{}>, state: State) {
  const { selectedUser, users } = state

  if (route.is(routes.blue)) return [h('span', 'I am the blue screen index')]
  if (route.isIn(routes.green)) return [green({ route })]
  if (route.isIn(routes.red)) return [
    h(`div.${styles.red}`, { key: 'red' }, [
      h('button', { events: { click: reloadUsers } }, 'Refresh select list'),
      h('br'),
      select({
        items: users.list,
        selectedItem: selectedUser,
        onChange: userChange,
        loading: users.loading
      })
    ])
  ]
  return []
}
