import page1 from './page1'
import page2 from './page2'
import notFound from './routeNotFound'
import { RouteDef, Routes } from 'route'
import view from './view'


export default RouteDef<Routes>('', {
  enter: router => (route, child) => view({ child, router, route }),

  children: {
    page1: page1(),
    page2: page2(),
    notFound: notFound
  }
})