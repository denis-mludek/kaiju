import { log } from 'kaiju'
import { Router } from 'abyssa'
import 'space-lift/es/all'

import classModule from 'snabbdom/es/modules/class'
import propsModule from 'snabbdom/es/modules/props'
import attrsModule from 'snabbdom/es/modules/attributes'

import { startApp } from 'common/util/router'
import app from 'app'
import notFound from 'app/routeNotFound'
import { Routes } from 'route'


Router.log = env.isDev
log.render = env.isDev
log.message = env.isDev


startApp<Routes>({
  app,
  elm: document.body,
  snabbdomModules: [
    classModule,
    propsModule,
    attrsModule
  ],
  notFound
})