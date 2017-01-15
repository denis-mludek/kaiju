require('./app.styl')

import { h, Component, ConnectParams, RenderParams, Node, VNode } from 'kaiju'
import { update } from 'immupdate'

import pageAnimation from 'widget/animation/page'
import link from 'widget/link'
import index from 'view/index'
import blue from 'view/blue'
import createAppStore, { AppStore } from 'view/app/store'
import { routes, RouteDef, Route } from 'router'


export default function route() {
  const appStore = createAppStore()

  return RouteDef('', {}, {
    enter: initRoute => (route, child) => app({ appStore, child, route }),

    children: {
      index: index(),
      blue: blue(() => appStore)
    }
  })
}


function app(props: Props) {
  return Component<Props, State>({ name: 'app', props, initState, connect, render })
}

type Props = {
  appStore: AppStore
  route: Route<{}>
  child: VNode
}

type State = {
  count: number
}

function initState() {
  return {} as State
}


function connect({ on, props }: ConnectParams<Props, State>) {
  const store = props().appStore

  on(store.state, (state, app) => update(state, { count: app.blue.count }))
}


function render({ props, state }: RenderParams<Props, State>): Node[] {
  const { route, child } = props

  return [
    h('header', [
      link({
        route: routes.index,
        label: 'Index',
        isActive: route.isIn(routes.index)
      }),
      link({
        route: routes.blue,
        params: { id: '33' },
        label: 'Blue',
        isActive: route.isIn(routes.blue)
      }),
      String(state.count)
    ]),
    pageAnimation('main', child)
  ]
}
