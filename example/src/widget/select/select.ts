const styles = require('./select.styl')

import update from 'immupdate'
import { Component, h, Message, ConnectParams, RenderParams, Vnode } from 'kaiju'


export default function<T>(props: Props<T>) {
  return Component<Props<T>, State>({ name: 'select', props, initState, connect, render })
}


interface Props<T> {
  items: Array<T>
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
const itemSelected = Message<any>('itemSelected')


function connect({ on, props, msg }: ConnectParams<Props<any>, State>) {
  on(open, state => update(state, { opened: true }))
  on(close, state => update(state, { opened: false }))
  on(itemSelected, (state, item) => msg.sendToParent(props().onChange(item)))
}


function render({ props, state }: RenderParams<Props<any>, State>) {
  const { items, selectedItem, loading } = props
  const { opened } = state

  const text = (!loading && items.indexOf(selectedItem) > -1) ? selectedItem : ''
  const dropdownEl = renderDropdownEl(props, opened)

  return (
    h('div', [
      h('input', {
        props: { value: text },
        attrs: { readonly: true, placeholder: 'click me' },
        events: { click: open, blur: close }
      }),
      dropdownEl
    ])
  )
}

function renderDropdownEl(props: Props<any>, opened: boolean) {
  const { items, loading } = props

  const itemRenderer = props.itemRenderer || ((item: any) => item.toString())

  const itemEls = opened && !loading
    ? items.map(itemRenderer).map(renderItem)
    : undefined

  const loaderEl = opened && loading
    ? [ h('li', 'Loading...') ]
    : undefined

  const dropdownEls = itemEls || loaderEl

  return dropdownEls
    ? h(`ul.${styles.dropdown}`, { hook: animationHook }, dropdownEls)
    : ''
}

function renderItem(item: any) {
  return h('li', { events: { mousedown: itemSelected.with(item) } }, item)
}

const animationHook = {
  insert: (vnode: Vnode) => {
    vnode.elm.animate(
      { opacity: [0, 1], transform: ['translateY(-20px)', 'translateY(0)'] },
      { duration: 300, easing: 'cubic-bezier(0.2, 0.6, 0.3, 1)', fill: 'forwards' }
    )
  },

  remove: (vnode: Vnode, cb: Function) => {
    vnode.elm.animate(
      { opacity: [1, 0], transform: ['translateY(0)', 'translateY(-20px)'] },
      { duration: 200, easing: 'cubic-bezier(0.2, 0.6, 0.3, 1)', fill: 'forwards' }
    ).onfinish = cb
  }
}
