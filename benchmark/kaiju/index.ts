
import { h, Component, startApp, ConnectParams, RenderParams, Message } from 'kaiju'


const snabbdomModules = [
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/style')
]

const initialItems = (Array.apply(null, { length: 100 }) as Array<undefined>).map((_, index) => index)

interface Props {
  initialItems: number[]
}

interface State {
  items: number[]
}

const list = (() => {

  function initState(props: Props) {
    return { items: props.initialItems }
  }

  const deleteRow = Message<number>('deleteRow')

  function connect({ on }: ConnectParams<Props, State>) {
    on(deleteRow, (state, row) => ({ items: state.items.filter(r => r !== row) }))
  }

  function render({ state }: RenderParams<Props, State>) {
    const itemEls = state.items.map(item => (
      h('li', { key: item }, [
        h('span', String(item)),
        h('input', { props: { value: 'bla' } }),
        h('button', { events: { onClick: deleteRow.with(item) } }, '✕')
      ])
    ))

    return h('ul', itemEls)
  }

  return function(props: Props) {
    return Component<Props, State>({ name: 'list', initState, connect, props, render })
  }
})()

const app = (
  h('div', [
    h('h1', 'hello'),
    h('p', 'My name is benchmark'),
    list({ initialItems })
  ])
)

const beforeRender = performance.now()

console.log('loading time', beforeRender)

startApp({ app, snabbdomModules, elm: document.querySelector('main') })

console.log('render time', performance.now() - beforeRender)
