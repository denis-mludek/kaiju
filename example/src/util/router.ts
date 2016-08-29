
import { StateWithParams, Router, State, RouterAPI, ConfigOptions, StateMap, api } from 'abyssa'
import { create, ObservableWithInitialValue } from 'kaiju/observable'

import * as arr from './array'


/* More typesafe, stateless abstraction using abyssa */

export interface Route<P> {
  uri: string
  path: string
}

export interface RouteWithParams<P> {
  route: Route<P>
  params: P

  /* Determines whether a runtime RouteWithParams holds a particular Route defined at compilation time */
  is<T>(other: Route<T>): this is RouteWithParams<T>

  /* Determines whether this route is included in or equal another and refine the params to those of that parent */
  isIn<T>(parent: Route<T>): this is RouteWithParams<T>
}

export function makeRouter(routes: Route<any>[], routerOptions: ConfigOptions) {
  const routesObj = routes.reduce((obj, route) => {
    obj[route.uri] = State(route.uri, {})
    return obj
  }, {} as StateMap)

  const router = Router(routesObj)
  routerOptions && router.configure(routerOptions)

  /* Creates an observable of route changes */
  const currentRoute = create(add => {
    router.on('ended', newState => {
      const route = arr.find(routes, route => route.uri === newState.fullName)
      if (!route) throw new Error('should never get there')
      add(makeRouteWithParams(route, newState.params))
    })
    return () => {}
  })
  .named('routeChange') as ObservableWithInitialValue<RouteWithParams<any>>

  /* Consumes the observable immediately and indefinitely, so it gets its initial value and never stop observing the router */
  currentRoute.subscribe(x => x)

  const routerApi = router.init()

  function transitionTo<P>(route: Route<P>, params: P) {
    routerApi.transitionTo(route.uri, params)
  }

  return {
    instance: routerApi,
    currentRoute,
    transitionTo
  }
}


export function Route<P>(uri: string): Route<P> {
  const path = uri.split('?')[0]
  return { uri, path }
}


function makeRouteWithParams(route: Route<any>, params: any) {
  return {
    route,
    params,
    is: (otherRoute: Route<any>) => route.path === otherRoute.path,
    isIn: (parentRoute: Route<any>) => route.path.indexOf(parentRoute.path) === 0
  }
}
