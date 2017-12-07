import { RouterAPI as Router } from 'abyssa'
import { RouteDef, Route as RuntimeRoute } from 'common/util/router'


/* The specific routes of this app. This provides a thin typesafe layer on top of abyssa for reverse routing and programmatic navigation */


type Nothing = {}
type Id = { id: string }

/* The enumeration of all addressable routes in the app, along with their params */
type RouteParams = {
  'page1': Id,
  'page2': Nothing,
}

export type Routes = keyof RouteParams

/* The type of the Route objects that will be passed in the Router callbacks */
export type Route = RuntimeRoute<Routes>


export function href<RN extends Routes>(router: Router, route: RN, params: RouteParams[RN]) {
  return router.link(`app.${route}`, params)
}

export function transitionTo<RN extends Routes>(router: Router, route: RN, params: RouteParams[RN] ) {
  return router.transitionTo(`app.${route}`, params)
}


export { Router, RouteDef }