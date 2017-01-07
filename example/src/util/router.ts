
import { Router as AbyssaRouter, State, ConfigOptions, ParamsDiff } from 'abyssa'
const vnode = require('snabbdom/vnode')
import { startApp, VNode, renderInto } from 'kaiju'
import * as obj from './obj'


/* More typesafe abstraction using abyssa */


/* A static route definition */
export type RouteDef<P, Children extends RouteMap> = {
  // The main data is 'hidden' in def so as to not polute the namespace and have nice children state autocomplete
  def: {
    uri: string
    fullName: string
    parent: RouteDef<{}, {}> | undefined
  } & RouteDefOptions<P, Children>
  params: P // The value is never used, it's only here to read the params type
} & Children

interface RouteDefOptions<P, Children extends RouteMap> {
  children: Children
  enter: (route: Route<P, Children>) => (route: Route<P, Children>, child: VNode) => VNode
  update?: (route: CurrentRoute<P, Children>) => void
  exit?: () => void
}

type RouteMap = Record<string, RouteDef<{}, {}>>

// Re-maps each RouteDef of the Map so that it cumulates its params and its parent's
type RouteMapWithParentParams<T extends RouteMap, ParentParams> = {
  [P in keyof T]: RouteDef<T[P]['params'] & ParentParams, T[P]['def']['children']>
}

/* A materialized route at runtime, complete with the actual parsed params */
export interface Route<P, Children extends RouteMap> {

  /* A reference to the matching route definition */
  route: RouteDef<P, Children>

  /* The parsed params at runtime */
  params: P

  /* Determines whether a runtime Route matches a Route definition */
  is(def: RouteDef<{}, {}>): boolean

  /* Determines whether this route is included in or matches a Route definition */
  isIn(def: RouteDef<{}, {}>): boolean
}

export interface CurrentRoute<P, Children extends RouteMap> extends Route<P, Children> {
  paramsDiff: ParamsDiff
}


/* Creates a new Route definition */
export function RouteDef<P, Children extends RouteMap, A>(
  uri: string,
  params: P,
  options: RouteDefOptions<P, Children>,
) {

  const children = options.children || {}

  return obj.merge({
    def: {
      uri,
      fullName: undefined!,
      parent: undefined!,
      ...options
    },
    params: undefined!
  }, children) as {} as RouteDef<P, RouteMapWithParentParams<Children, P> & RouteMap>
}


type RouterOptions<Routes extends RouteMap> = ConfigOptions & {
  routes: Routes,
  elm: Element,
  snabbdomModules: Array<{}>
}

/* Creates the router and starts the application */
export function Router<Routes extends RouteMap>(options: RouterOptions<Routes>) {

  // The lookup of our custom route objects by full name
  const routeByName: Obj<RouteDef<{}, {}>> = {}

  // The components currently mounted, top-down
  const components: Array<(route: Route<{}, {}>, child: VNode) => VNode> = []

  // The current route in the transition
  let currentRoute: CurrentRoute<{}, {}> | undefined

  // The current app VNode
  let currentVNode: VNode | undefined

  // Translate our RouteDefs into abyssa States
  function transformRouteTree<K extends string>(
    name: string,
    route: RouteDef<{}, {}>,
    parent: RouteDef<{}, {}> | undefined = undefined
  ): State {

    routeByName[name] = route

    route.def.parent = parent
    route.def.fullName = name

    const children = route.def.children
      ? obj.mapValues(route.def.children, (childName, childRoute) =>
          transformRouteTree(`${name}.${childName}`, childRoute, route))
      : {}

    return State(route.def.uri, {
      enter: (params) => {
        components.push(
          route.def.enter(currentRoute!))
      },
      update: () => {
        if (route.def.update)
          route.def.update(currentRoute!)
      },
      exit: () => {
        components.pop()
        if (route.def.exit)
          route.def.exit()
      }
    }, children)
  }


  const rootStates = obj.mapValues(options.routes as {}, transformRouteTree)
  const router = AbyssaRouter(rootStates)

  router.configure(options)

  router.on('started', newState => {
    const routeDef = routeByName[newState.fullName]
    currentRoute = makeRoute(routeDef, newState.params, newState.paramsDiff)
  })

  router.on('ended', () => {
    const newAppNode = components.reduceRight((previous, current) => {
      return current(currentRoute!, previous)
    }, emptyVNode())

    if (currentVNode) {
      renderInto(currentVNode, newAppNode)
    }
    else {
      // Renders asynchronously for import ordering convenience in the main module.
      // e.g, this way, a render function can use router.link, etc.
      requestAnimationFrame(() =>
        startApp({
          app: newAppNode,
          elm: options.elm,
          snabbdomModules: options.snabbdomModules
        })
      )
    }

    currentVNode = newAppNode
  })

  const routerApi = router.init()


  function transitionTo<P>(route: RouteDef<P, {}>, params: P) {
    return routerApi.transitionTo(route.def.fullName, params)
  }

  function link<P, C>(route: RouteDef<P, {}>, params: P) {
    return routerApi.link(route.def.fullName, params)
  }

  function replaceParams(params: {}) {
    return routerApi.replaceParams(params)
  }

  return  {
    routes: options.routes,
    transitionTo,
    replaceParams,
    link
  }
}


function makeRoute(route: RouteDef<{}, {}>, params: {}, paramsDiff: ParamsDiff) {
  return {
    route,
    params,
    paramsDiff,
    is: (otherRoute: RouteDef<{}, {}>) => route.def.fullName === otherRoute.def.fullName,
    isIn: (parentRoute: RouteDef<{}, {}>) => {
      let parent = route
      while (parent) {
        if (parent === parentRoute) return true
        parent = parent.def.parent!
      }
      return false
    }
  }
}

function emptyVNode() {
  return vnode('div', { key: '_emptyVNode' }, [], undefined, undefined)
}
