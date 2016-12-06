require('./app.styl')

import { h, ConnectParams, RenderParams } from 'kaiju'
import { Store } from 'kaiju/store'
import update, { replace } from 'immupdate'

import pageAnimation from '../../util/animation/page'
import { ComponentWithStores } from '../../util/vnode'
import link from '../../widget/link'
import index from '../../index'
import blue from '../blue'
import createAppStore, { AppStore } from './store'
import * as routes from '../../router'
import { RouteWithParams } from '../../router'


export default ComponentWithStores<{}, State, StoreProps>(
  { name: 'app', initState, connect, render },
  stores
)


interface StoreProps extends Obj<Store<{}>>  {
  appStore: AppStore
}

interface State {
  count: number
  route: RouteWithParams<{}>
}

function stores() {
  return { appStore: createAppStore() }
}

function initState() {
  return {} as State
}


function connect({ on, props }: ConnectParams<StoreProps, State>) {
  const store = props().appStore

  on(store.state, (state, app) => update(state, { count: app.blue.count }))
  on(routes.current, (state, route) => update(state, { route: replace(route) }))
}


function render({ props, state }: RenderParams<StoreProps, State>) {
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
    pageAnimation('main', getChildren(state.route, props.appStore))
  ])
}

function getChildren(route: RouteWithParams<{}>, appStore: AppStore) {
  if (route.is(routes.index)) return [index()]
  if (route.isIn(routes.blue)) return [blue({ route, appStore })]
  return []
}
