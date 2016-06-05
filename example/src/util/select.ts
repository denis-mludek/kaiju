import update from 'immupdate'
import { Component, h, Message, ConnectParams, Vnode } from 'dompteuse'
import { Stream } from 'most'

import { TweenLite } from './gsap'
import { merge } from './obj'


export default function<T>(props?: Props<T>) {
  return Component({
    key: 'select',
    props,
    defaultProps,
    initState,
    connect,
    render
  })
}


const Open = Message('open')
const Close = Message('close')
const ItemSelected = Message<any>('itemSelected')


interface Props<T> {
  items: Array<T>
  selectedItem: T
  onChange: Function
  loading: boolean
}

const defaultProps: any = {
  items: []
}

interface State {
  opened: boolean
}

function initState() {
  return { opened: false }
}

function connect({ on, props, messages }: ConnectParams<Props<any>, State>) {
  on(Open, state => merge(state, { opened: true }))
  on(Close, state => merge(state, { opened: false }))

  on(ItemSelected, (state, item) => {
    messages.send(props().onChange(item))
    return state
  })
}

function render(props: Props<any>, state: State) {
  const { items, selectedItem, loading } = props
  const { opened } = state

  const text = (!loading && items.indexOf(selectedItem) > -1) ? selectedItem : ''
  const dropdownEl = getDropdownEl(items, opened, loading)

  return h('div.select', [
    h('input', {
      events: { onClick: Open, onBlur: Close },
      props: { value: text },
      attrs: { readonly: true, placeholder: 'click me' }
    }),
    dropdownEl
  ])
}

function getDropdownEl(items: Array<any>, opened: boolean, loading: boolean) {
  const itemEls = opened && !loading
    ? items.map(renderItem)
    : undefined

  const loaderEl = opened && loading
    ? [ h('li', 'Loading...') ]
    : undefined

  const dropdownEls = itemEls || loaderEl

  return dropdownEls
    ? h('ul.dropdown', { hook: animationHook }, dropdownEls)
    : ''
}

function renderItem(item: any) {

  function onMouseDown(evt: Event) {
    return ItemSelected(item)
  }

  return h('li', { events: { onMouseDown } }, item)
}

const animationHook = {
  insert: (vnode: Vnode) => {
    TweenLite.from(vnode.elm, 0.14, { opacity: 0, y: -10 })
  },

  remove: (vnode: Vnode, cb: Function) => {
    TweenLite.to(vnode.elm, 0.14, { opacity: 0, y: -10 }).eventCallback('onComplete', cb)
  }
}
