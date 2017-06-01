import classModule from 'snabbdom/modules/class'
import propsModule from 'snabbdom/modules/props'
import attrsModule from 'snabbdom/modules/attributes'
import 'space-lift/all'
import 'logger'

import { startApp } from 'util/router'
import app from 'view/app'
import notFound from 'view/app/routeNotFound'
import { RouteNames } from 'route'


const snabbdomModules = [
  classModule,
  propsModule,
  attrsModule
]

startApp<RouteNames>({
  app,
  elm: document.querySelector('#screenLayer')!,
  snabbdomModules,
  urlSync: 'hash',
  notFound
})
