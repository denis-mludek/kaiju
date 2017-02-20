import classModule from 'snabbdom/modules/class'
import propsModule from 'snabbdom/modules/props'
import attrsModule from 'snabbdom/modules/attributes'

import { Router, RouteDef, Route as RuntimeRoute } from 'util/router'
import app from 'view/app'


const snabbdomModules = [
  classModule,
  propsModule,
  attrsModule
]

const router = Router({
  routes: { app: app() },
  elm: document.querySelector('#screenLayer')!,
  snabbdomModules,
  urlSync: 'hash'
})

// Skip the first level so that we don't have to write 'app.' everytime
export const routes = router.routes.app

// We don't actually need to read the Children type of Route: This is an implementation detail.
// So alias away the second type param for convenience
type Route<P> = RuntimeRoute<P, {}>

// Re-export for convenience so that we don't have to also import util/router
export { RouteDef, Route, Router }


router.init()
