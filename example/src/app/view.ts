import * as style from './app.less'

import { h, Component, ConnectParams, RenderParams, Node, VNode } from 'kaiju'

import { slideDown } from 'common/widget/animation/single/slideDown'
import link from 'common/widget/link'
import { Router, Route, href } from 'route'


export default function app(props: Props) {
  return Component<Props, State>({ name: 'app', props, initState, connect, render })
}

type Props = {
  router: Router
  route: Route
  child: VNode
}

type State = {}

function initState() {
  return {} as State
}


function connect({}: ConnectParams<Props, State>) {}


function render({ props }: RenderParams<Props, State>): Node[] {
  const { router, route, child } = props

  return [

    h(`div.${style.screenLayer}`, [
      h(`header.${style.header}`, [
        link({
          href: href(router, 'page1', { id: '33' }),
          label: 'Page 1',
          isActive: route.isIn('page1')
        }),
        link({
          href: href(router, 'page2', {}),
          label: 'Page 2',
          isActive: route.isIn('page2')
        })
      ]),
      slideDown(child, 'main')
    ]),

    h('div', { attrs: { 'data-popup-layer': true } })
  ]
}