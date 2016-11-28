
import { Router, State, ConfigOptions, StateMap } from 'abyssa'
import { Observable, ObservableWithInitialValue } from 'kaiju/observable'
import * as arr from './array'

/* More typesafe, abstraction using abyssa */


/* A static route definition */
export interface Route<P> {
  uri: string
  path: string
  parent?: Route<{}>
  fullName: string
  params: P // This will never be set; just there to read the type of the params
}

/* A materialized route at runtime, complete with the actual parsed params */
export interface RouteWithParams<P> {
  route: Route<P>
  params: P

  /* Determines whether a runtime RouteWithParams holds a particular Route defined at compilation time */
  is<T>(other: Route<T>): this is RouteWithParams<T>

  /* Determines whether this route is included in or equal another and refine the params to those of that parent */
  isIn<T>(parent: Route<T>): this is RouteWithParams<T>
}


export function makeRouter(routes: Route<{}>[], routerOptions: ConfigOptions) {
  const rootStates = routes.filter(r => !r.parent)

  function getStateChildren(route: Route<{}>): StateMap {
    return routes.filter(r => r.parent === route).reduce((obj, childRoute) => {
      obj[childRoute.path] = State(childRoute.uri, {}, getStateChildren(childRoute))
      return obj
    }, {} as StateMap)
  }

  const routesObj = rootStates.reduce((obj, route) => {
    const children = getStateChildren(route)
    obj[route.path] = State(route.uri, {}, children)
    return obj
  }, {} as StateMap)

  const router = Router(routesObj)
  routerOptions && router.configure(routerOptions)

  /* Creates an observable of route changes */
  const currentRoute = Observable(add => {
    router.on('ended', newState => {
      const route = arr.find(routes, route => route.fullName === newState.fullName)
      if (!route) throw new Error('should never get there')
      add(makeRouteWithParams(route, newState.params))
    })
    return () => {}
  })
  .named('routeChange') as any as ObservableWithInitialValue<RouteWithParams<{}>>

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
  return { uri, path, fullName: path } as any
}

export function RouteWithParent<PP>(parent: Route<PP>) {
  return function<P>(uri: string): Route<P & PP> {
    const path = uri.split('?')[0]
    const fullName = `${parent.fullName}.${path}`
    return { uri, path, parent, fullName } as any
  }
}


function makeRouteWithParams(route: Route<{}>, params: {}) {
  return {
    route,
    params,
    is: (otherRoute: Route<{}>) => route.fullName === otherRoute.fullName,
    isIn: (parentRoute: Route<{}>) => {
      let parent = route
      while (parent) {
        if (parent === parentRoute) return true
        parent = parent.parent!
      }
      return false
    }
  }
}
