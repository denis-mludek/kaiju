import * as styles from './page1.less'

import { h, Component, ConnectParams, RenderParams, Message, connectToStore } from 'kaiju'
import { update } from 'space-lift'

import { fadeIn } from 'common/widget/animation/single/fade'
import { UserStore, UserState } from './store'


export default connectToStore<UserStore>()(page1, store => ({ users: store.state().users }))

function page1(props: Props) {
  return Component<Props, State>({ name: 'page1', props, initState, connect, render })
}

type Props = {
  users: UserState['users']
  store: UserStore
}

type State = {
  count: number
}

function initState() {
  return {
    count: 0
  }
}


const increment = Message('increment')


function connect({ on, state }: ConnectParams<Props, State>) {
  on(increment, () => update(state(), { count: state().count + 1 }))
}


function render({ props, state }: RenderParams<Props, State>) {
  const { users } = props
  const { count } = state

  const usersEl = users.type === 'success'
    ? h('ul', users.data.map(u => h('li', u)))
    : h('div', 'Loading...')

  return h('div', [
    h('p', `count = ${count}`),
    h(`button.${styles.incrementButton}`, { events: { click: increment } }, 'increment'),
    fadeIn(usersEl)
  ])
}


