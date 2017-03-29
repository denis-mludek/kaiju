require('./app.styl')

import { h, Component, ConnectParams, RenderParams, Node, VNode } from 'kaiju'
import { update as copy } from 'immupdate'

import pageAnimation from 'widget/animation/page'
import link from 'widget/link'
import index from 'view/index'
import blue from 'view/blue'
import notFound from 'view/app/routeNotFound'
import createAppStore, { AppStore } from 'view/app/store'
import { routes, RouteDef, Router, Route } from 'router'


export default function route() {
  const appStore = createAppStore()

  return RouteDef('', {}, {
    enter: router => (route, child) => app({ appStore, child, router, route }),

    children: {
      index: index(),
      blue: blue(() => appStore),
      notFound: notFound()
    }
  })
}


function app(props: Props) {
  return Component<Props, State>({ name: 'app', props, initState, connect, render })
}

type Props = {
  appStore: AppStore
  router: Router
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

  on(store.state, (state, app) => copy(state, { count: app.blue.count }))
}


function render({ props, state }: RenderParams<Props, State>): Node[] {
  const { router, route, child } = props

  return [
    h('header', [
      link({
        router,
        route: routes.index,
        label: 'Index',
        isActive: route.isIn(routes.index)
      }),
      link({
        router,
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
