import update from 'immupdate'
import { Component, h, Message, ConnectParams, Vnode } from 'dompteuse'
import anime from 'animejs'

import { merge } from './obj'


export default function<T>(props?: Props<T>) {
  return Component<Props<T>, State>({ name: 'select', props, defaultProps, initState, connect, render })
}


interface Props<T> {
  items: Array<T>
  selectedItem: T
  onChange: Message<T>
  itemRenderer?: (item: T) => string
  loading: boolean
}

const defaultProps: any = {
  items: [],
  itemRenderer: (item: any) => item.toString()
}

interface State {
  opened: boolean
}

function initState() {
  return { opened: false }
}


const open = Message('open')
const close = Message('close')
const itemSelected = Message<any>('itemSelected')


function connect({ on, props, msg }: ConnectParams<Props<any>, State>) {
  on(open, state => merge(state, { opened: true }))
  on(close, state => merge(state, { opened: false }))
  on(itemSelected, (state, item) => msg.sendToParent(props().onChange(item)))
}


function render(props: Props<any>, state: State) {
  const { items, selectedItem, loading, itemRenderer } = props
  const { opened } = state

  const text = (!loading && items.indexOf(selectedItem) > -1) ? selectedItem : ''
  const dropdownEl = getDropdownEl(props, opened)

  return (
    h('div', [
      h('input', {
        events: { onClick: open, onBlur: close },
        props: { value: text },
        attrs: { readonly: true, placeholder: 'click me' }
      }),
      dropdownEl
    ])
  )
}

function getDropdownEl(props: Props<any>, opened: boolean) {
  const { items, itemRenderer, loading } = props

  const itemEls = opened && !loading
    ? items.map(itemRenderer).map(renderItem)
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
  return h('li', { events: { onMouseDown: itemSelected.with(item) } }, item)
}

const animationHook = {
  insert: (vnode: Vnode) => {

    vnode.elm.style.opacity = '0'
    anime(vnode.elm, {
      duration: 140,
      opacity: [0, 1],
      translateY: ['-10px', '0px']
    })
  },

  remove: (vnode: Vnode, cb: Function) => {

    anime(vnode.elm, {
      duration: 140,
      opacity: 0,
      translateY: '-10px',
      complete: cb
    })
  }
}
