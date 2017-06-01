require('./app.styl')

import { h, Component, ConnectParams, RenderParams, Node, VNode } from 'kaiju'
import { update } from 'space-lift'

import fadeAnimation from 'widget/animation/single/fade'
import link from 'widget/link'
import index from 'view/index'
import blue from 'view/blue'
import notFound from 'view/app/routeNotFound'
import createAppStore, { AppStore } from 'view/app/store'
import { RouteDef, Router, Route, href } from 'route'


export default (() => {
  const appStore = createAppStore()

  return RouteDef('', {
    enter: router => (route, child) => app({ appStore, child, router, route }),

    children: {
      index: index(),
      blue: blue(() => appStore),
      notFound: notFound
    }
  })
})()


function app(props: Props) {
  return Component<Props, State>({ name: 'app', props, initState, connect, render })
}

type Props = {
  appStore: AppStore
  router: Router
  route: Route
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
  const { router, route, child } = props

  return [
    h('header', [
      link({
        href: href(router, 'index', {}),
        label: 'Index',
        isActive: route.isIn('index')
      }),
      link({
        href: href(router, 'blue', { id: '33' }),
        label: 'Blue',
        isActive: route.isIn('blue')
      }),
      String(state.count)
    ]),
    fadeAnimation(child, 'main')
  ]
}
