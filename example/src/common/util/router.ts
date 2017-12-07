import { Router as AbyssaRouter, RouterAPI, State, CurrentStateWithParams } from 'abyssa'
import { h, startApp as startKaijuApp, VNode, Render } from 'kaiju'
import lift from 'space-lift'


/* Abyssa router integrated with kaiju */


/* A static route definition */
export type RouteDef<RT extends string> = {
  uri: string
  fullName: string
  parent: RouteDef<RT> | undefined
  __rt: RT
} & RouteDefOptions<RT>

interface RouteDefOptions<RT extends string> {
  children: RouteMap<RT>
  enter: (router: RouterAPI, initRoute: Route<RT>) => (route: Route<RT>, child: VNode) => VNode
  update?: (route: Route<RT>) => void
  exit?: () => void
}

type RouteMap<RT extends string> = Record<string, RouteDef<RT>>

/* A materialized route at runtime, complete with the actual parsed params */
export interface Route<RT extends string> extends CurrentStateWithParams {
  isIn(fullName: RT): boolean
}

/* Creates a new Route definition */
export function RouteDef<RT extends string>(
  uri: string,
  options: RouteDefOptions<RT>
): RouteDef<RT> {

  const children = options.children || {}

  return Object.assign({
    uri,
    fullName: undefined!,
    parent: undefined!,
    ...options
  }, children) as {} as RouteDef<RT>
}

type RouterOptions<RT extends string> = {
  // kaiju related options
  app: RouteDef<RT>
  elm: Element
  replaceElm?: boolean
  snabbdomModules: Array<{}>

  // abyssa related options
  enableLogs?: boolean
  interceptAnchors?: boolean
  urlSync?: 'history' | 'hash'
  hashPrefix?: string
  notFound?: RouteDef<RT>
}

/* Creates the router and starts the application */
export function startApp<RT extends string>(options: RouterOptions<RT>): void {

  // The lookup of our custom route objects by full name
  const routeByName: Record<string, RouteDef<RT>> = {}

  // The components currently mounted, top-down
  const components: Array<(route: Route<RT>, child: VNode) => VNode> = []

  // The current route in the transition
  let currentRoute: Route<RT> | undefined

  // The current app VNode
  let currentVNode: VNode | undefined

  // Translate our RouteDefs into abyssa States
  function transformRouteTree(
    name: string,
    route: RouteDef<RT>,
    parent: RouteDef<RT> | undefined = undefined
  ): State {

    routeByName[name] = route

    route.parent = parent
    route.fullName = name

    const children = route.children
      ? lift(route.children)
          .mapValues((childName, childRoute) => transformRouteTree(`${name}.${childName}`, childRoute, route))
          .value()
      : {}

    return State(route.uri, {
      enter(_, __, router) {
        components.push(
          route.enter(router, currentRoute!))
      },
      update() {
        if (route.update)
          route.update(currentRoute!)
      },
      exit() {
        components.pop()
        if (route.exit)
          route.exit()
      }
    }, children)
  }


  const rootStates = lift({ app: options.app }).mapValues(transformRouteTree).value()
  const router = AbyssaRouter(rootStates)

  const abyssaOptions = Object.assign({}, options, {
    notFound: options.notFound && options.notFound.fullName
  })

  router.configure(abyssaOptions)

  router.on('started', newState => {
    currentRoute = Object.assign({}, newState, {
      fullName: newState.fullName.replace('app.', ''),
      isIn: (parent: string) => newState.isIn(`app.${ parent }`)
    })
  })

  router.on('ended', () => {
    const newAppNode = components.reduceRight((previous, current) => {
      return current(currentRoute!, previous)
    }, emptyVNode())

    if (currentVNode) {
      Render.into(currentVNode, newAppNode)
    }
    else {
      startKaijuApp({
        app: newAppNode,
        elm: options.elm,
        replaceElm: options.replaceElm,
        snabbdomModules: options.snabbdomModules
      })
    }

    currentVNode = newAppNode
  })

  router.init()
}

const emptyVNode = () => h('div', { key: '_emptyVNode' })