const styles = require('./select.styl')

import { update as copy } from 'immupdate'
import { Component, h, Message, ConnectParams, RenderParams, VNode } from 'kaiju'


export default function<T>(props: Props<T>) {
  return Component<Props<T>, State>({ name: 'select', props, initState, connect, render })
}


interface Props<T> {
  items: T[]
  selectedItem: T
  onChange: Message<T>
  itemRenderer?: (item: T) => string
  loading: boolean
}

interface State {
  opened: boolean
}

function initState() {
  return { opened: false }
}


const open = Message('open')
const close = Message('close')
const itemSelected = Message<[Event, {}]>('itemSelected')


function connect<T>({ on, props, msg }: ConnectParams<Props<T>, State>) {
  on(open, state => copy(state, { opened: true }))
  on(close, state => copy(state, { opened: false }))

  on(itemSelected, (state, [_, item]) =>
    msg.sendToParent(props().onChange(item as T)))
}


function render<T>({ props, state }: RenderParams<Props<T>, State>) {
  const { items, selectedItem, itemRenderer, loading } = props
  const { opened } = state

  const text = (!loading && items.indexOf(selectedItem) > -1)
    ? itemRenderer ? itemRenderer(selectedItem) : selectedItem.toString()
    : ''

  const dropdownEl = renderDropdownEl(props, opened)

  return [
    h('input', {
      props: { value: text },
      attrs: { readonly: true, placeholder: 'click me' },
      events: { click: open, blur: close }
    }),
    dropdownEl
  ]
}

function renderDropdownEl(props: Props<{}>, opened: boolean) {
  const { items, loading, itemRenderer } = props

  const itemEls = opened && !loading
    ? (itemRenderer ? items.map(itemRenderer) : items).map(renderItem)
    : undefined

  const loaderEl = opened && loading
    ? [ h('li', 'Loading...') ]
    : undefined

  const dropdownEls = itemEls || loaderEl

  return dropdownEls
    ? h(`ul.${styles.dropdown}`, { hook: animationHook }, dropdownEls)
    : ''
}

function renderItem(item: string) {
  return h('li', { events: { mousedown: itemSelected.with(item) } }, item)
}

const animationHook = {
  insert: (vnode: VNode) => {
    vnode.elm.animate(
      { opacity: [0, 1], transform: ['translateY(-20px)', 'translateY(0)'] },
      { duration: 300, easing: 'cubic-bezier(0.2, 0.6, 0.3, 1)', fill: 'forwards' }
    )
  },

  remove: (vnode: VNode, cb: Function) => {
    vnode.elm.animate(
      { opacity: [1, 0], transform: ['translateY(0)', 'translateY(-20px)'] },
      { duration: 200, easing: 'cubic-bezier(0.2, 0.6, 0.3, 1)', fill: 'forwards' }
    ).onfinish = cb
  }
}
