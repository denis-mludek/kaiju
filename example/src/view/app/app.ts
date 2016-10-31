require('./app.styl')

import { Component, h, ConnectParams, RenderParams } from 'kaiju'
import update from 'immupdate'

import pageAnimation from '../../util/animation/page'
import link from '../../widget/link'
import index from '../../index'
import blue from '../blue'
import appStore from '../../appStore'
import * as routes from '../../router'


export default Component<void, State>({ name: 'app', initState, connect, render })


interface State {
  count: number
  route: routes.RouteWithParams<any>
}


function initState() {
  return {} as State
}


function connect({ on }: ConnectParams<void, State>) {
  on(appStore.state, (state, app) => update(state, { count: app.blue.count }))
  on(routes.current, (state, route) => update(state, { route }))
}


function render({ state }: RenderParams<void, State>) {
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
    pageAnimation('main', getChildren(state.route))
  ])
}

function getChildren(route: routes.RouteWithParams<any>) {
  if (route.is(routes.index)) return [index()]
  if (route.isIn(routes.blue)) return [blue({ route })]
  return []
}
