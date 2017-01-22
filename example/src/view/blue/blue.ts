const styles = require('./blue.styl')

import { h, Component, ConnectParams, RenderParams, VNode, Node } from 'kaiju'
import { update as copy } from 'immupdate'

import sectionAnimation from 'widget/animation/section'
import green from 'view/blue/green'
import red from 'view/blue/red'
import { AppStore, incrementCounter } from 'view/app/store'
import { routes, RouteDef, Route } from 'router'
import link from 'widget/link'
import { UserStore } from 'view/blue/userStore'



type Params = { id: string }

export default function blueRoute(appStore: () => AppStore) {
  let userStore: UserStore

  return RouteDef('blue/:id', <Params>{}, {

    enter: initRoute => {
      userStore = UserStore(initRoute.params.id)
      return (route, child) => blue({ appStore: appStore(), route, child })
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
  route: Route<Params>
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
  const { route, child } = props
  const id = route.params.id

  return [
    h('h1', 'Blue screen'),
    link({
      route: routes.blue.green,
      params: { id },
      label: 'Green',
      isActive: route.isIn(routes.blue.green)
    }),
    link({
      route: routes.blue.red,
      params: { id },
      label: 'Red',
      isActive: route.isIn(routes.blue.red)
    }),
    h(`div.${styles.increment}`, [
      'Count: ' + state.count,
      h('button', { events: { click: incrementCounter } }, 'Increment')
    ]),
    sectionAnimation('section', child)
  ]
}
