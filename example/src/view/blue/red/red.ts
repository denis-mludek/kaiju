const styles = require('./red.styl')

import { update as copy } from 'immupdate'
import { h, Component, ConnectParams, RenderParams, Message } from 'kaiju'

import { RouteDef } from 'router'
import { UserStore, Users, reloadUsers, loadNextUserPage } from 'view/blue/userStore'
import select from 'widget/select'
import { unpack } from 'util/remoteData'


export default function route(userStore: () => UserStore) {
  return RouteDef('red', {}, {
    enter: () => () => red({ userStore: userStore() }),
    children: {}
  })
}


function red(props: Props) {
  return Component<Props, State>({ sel: `component.${styles.red}`, name: 'red', props, initState, connect, render })
}


interface Props {
  userStore: UserStore
}

interface State extends Users {
  selectedUser?: string
}

function initState() {
  return {
    users: undefined!,
    pagination: undefined!,
    selectedUser: undefined
  }
}


const userChange = Message<string>('userChange')

function connect({ on, props }: ConnectParams<Props, State>) {
  const userStore = props().userStore

  on(userStore.state, (state, { users, pagination }) => copy(state, { users, pagination }))

  on(reloadUsers, _ => userStore.send(reloadUsers()))
  on(loadNextUserPage, _ => userStore.send(loadNextUserPage()))

  on(userChange, (state, user) => copy(state, { selectedUser: user }))
}

function render({ state }: RenderParams<Props, State>) {
  const { selectedUser, users, pagination } = state

  const { data = [], loading } = unpack(users)

  return [
    h('button', { events: { click: reloadUsers } }, 'Refresh select list'),
    h('br'),
    select({
      items: data,
      selectedItem: selectedUser,
      onChange: userChange,
      loading,
      pagination
    })
  ]
}
