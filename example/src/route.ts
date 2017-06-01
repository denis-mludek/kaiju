import { RouterAPI as Router } from 'abyssa'
import { RouteDef, Route as RuntimeRoute } from 'util/router'


/* The specific routes of this app. This provides a thin typesafe layer on top of abyssa for reverse routing and programmatic navigation */


type Nothing = {}
type Id = { id: string }

/* The enumeration of all addressable routes in the app, along with their params */
type RouteParams = {
  'index': Nothing,
  'blue': Id,
  'blue.green': Id,
  'blue.red': Id
}

export type RouteNames = keyof RouteParams

/* The type of the Route objects that will be passed in the Router callbacks */
export type Route = RuntimeRoute<RouteNames>


export function href<RN extends RouteNames>(router: Router, route: RN, params: RouteParams[RN]) {
  return router.link(`app.${route}`, params)
}

export function transitionTo<RN extends RouteNames>(router: Router, route: RN, params: RouteParams[RN] ) {
  return router.transitionTo(`app.${route}`, params)
}


export { Router, RouteDef }