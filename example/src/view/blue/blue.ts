const styles = require('./blue.styl')

import { h, Component, ConnectParams, RenderParams, VNode, Node } from 'kaiju'
import { update as copy } from 'space-lift'

import { RouteDef, Router, Route, href } from 'route'
import green from 'view/blue/green'
import red from 'view/blue/red'
import { AppStore, incrementCounter } from 'view/app/store'
import { UserStore } from 'view/blue/userStore'
import link from 'widget/link'
import slideDownAnimation from 'widget/animation/single/slideDown'


export default function blueRoute(appStore: () => AppStore) {
  let userStore: UserStore

  return RouteDef('blue/:id', {

    enter: (router) => {
      userStore = UserStore()
      return (route, child) => blue({ appStore: appStore(), router, route, child })
    },

    exit: () => {
      userStore.destroy()
    },

    children: {
      green: green(),
      red: red(() => userStore)
    }
  })
}

function blue(props: Props) {
  return Component<Props, State>({ name: 'blue', props, initState, connect, render })
}


interface Props {
  child: VNode
  router: Router
  route: Route
  appStore: AppStore
}

interface State {
  count: number
}

function initState() {
  return {
    count: undefined!
  }
}

function connect({ on, props }: ConnectParams<Props, State>) {
  const { appStore } = props()

  on(incrementCounter, _ => appStore.send(incrementCounter()))

  on(appStore.state, (state, appState) => copy(state, { count: appState.blue.count }))
}


function render({ props, state }: RenderParams<Props, State>): Node[] {
  const { router, route, child } = props
  const id = route.params.id

  return [
    h('h1', 'Blue screen'),
    link({
      href: href(router, 'blue.green', { id }),
      label: 'Green',
      isActive: route.isIn('blue.green')
    }),
    link({
      href: href(router, 'blue.red', { id }),
      label: 'Red',
      isActive: route.isIn('blue.red')
    }),
    h(`div.${styles.increment}`, [
      'Count: ' + state.count,
      h('button', { events: { click: incrementCounter } }, 'Increment')
    ]),
    slideDownAnimation(child, 'section')
  ]
}
