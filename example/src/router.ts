import { makeRouter, Route, RouteWithParent, RouteWithParams } from './util/router'

// Re-export for convenience, so we don't have to also import the abstract router util
export { Route, RouteWithParams }


export const index = Route('')
export const blue = Route<{ id: string }>('blue/:id')
export const green = RouteWithParent(blue)<{ popup?: string }>('green?popup')
export const red = RouteWithParent(blue)('red')

const router = makeRouter([
  index,
  blue,
  green,
  red
], { urlSync: 'hash' })

export const current = router.currentRoute
export const transitionTo = router.transitionTo
export const replaceParams = router.instance.replaceParams
export const link = router.instance.link
