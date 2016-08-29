require('./layout.styl')

import { api as router, StateWithParams } from 'abyssa'
import { Component, h, ConnectParams } from 'kaiju'

import fadeAnimation from '../util/animation/fadeAnimation'
import link from '../widget/link'
import index from '../index'
import blue from '../blue'
import appStore, { incrementBlue } from '../appStore'
import * as routes from '../router'
import { merge } from '../util/obj'


export default Component<void, State>({ name: 'app', initState, connect, render })


interface State {
  count: number
  route: routes.RouteWithParams<any>
}


function initState() {
  return {
    count: appStore.state().blue.count,
    route: routes.current()
  }
}


function connect({ on }: ConnectParams<void, State>) {
  on(appStore.state, (state, app) => merge(state, { count: app.blue.count }))
  on(routes.current, (state, route) => merge(state, { route }))
}


function render(props: void, state: State) {
  const { route } = state

  return h('div', [
    h('header', [
      link({
        route: routes.index,
        label: 'Index',
        isActive: route.is(routes.index)
      }),
      link({
        route: routes.blue,
        params: { id: '33' },
        label: 'Blue',
        isActive: route.isIn(routes.blue)
      }),
      String(state.count)
    ]),
    fadeAnimation('main', getChildren(state.route))
  ])
}

function getChildren(route: routes.RouteWithParams<any>) {
  if (route.is(routes.index)) return [index()]
  if (route.isIn(routes.blue)) return [blue()]
  return []
}


//setInterval(appStore.send.bind(null, IncrementBlue()), 2500)
