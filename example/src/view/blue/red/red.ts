const styles = require('./red.styl')

import update from 'immupdate'
import { h, Component, ConnectParams, RenderParams, Message } from 'kaiju'

import { RouteDef } from 'router'
import { Users, UserStore, reloadUsers } from 'view/blue/userStore'
import select from 'widget/select'


export default function route(userStore: () => UserStore) {
  return RouteDef('red', {}, {
    enter: initRoute => () => red({ userStore: userStore() }),
    children: {}
  })
}


function red(props: Props) {
  return Component<Props, State>({ sel: `component.${styles.red}`, name: 'red', props, initState, connect, render })
}


interface Props {
  userStore: UserStore
}

interface State {
  users: Users
  selectedUser?: string
}

function initState() {
  return {
    users: undefined!,
    selectedUser: undefined
  }
}


const userChange = Message<string>('userChange')


function connect({ on, props }: ConnectParams<Props, State>) {
  const userStore = props().userStore

  on(userStore.state, (state, users) => update(state, { users }))
  on(reloadUsers, _ => userStore.send(reloadUsers()))

  on(userChange, (state, user) => update(state, { selectedUser: user }))
}

function render({ state }: RenderParams<Props, State>) {
  const { selectedUser, users } = state

  return [
    h('button', { events: { click: reloadUsers } }, 'Refresh select list'),
    h('br'),
    select({
      items: users.list,
      selectedItem: selectedUser,
      onChange: userChange,
      loading: users.loading
    })
  ]
}
