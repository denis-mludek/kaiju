
import { h, Component, Vnode, Message, ConnectParams, patch } from 'dompteuse'
import { TweenLite } from './gsap'
import { findParentByClass } from './dom'


let popupContainer = document.getElementById('popups')

export const Close = Message('close')
const OverlayClick = Message<Event>('OverlayClick')

interface Props {
  content: Array<Vnode>
  onClose: Function
}

export default function(props: Props) {
  return Component({
    key: 'popup',
    props,
    initState,
    connect,
    render
  })
}

function initState() {
  return {}
}

// Listen for messages inside the popup container, and redispatch at the Popup launcher level.
function connect({ on, props, messages }: ConnectParams<Props, {}>) {

  messages.listenAt('#popups', Close).forEach(_ =>
    messages.send(props().onClose()))

  messages.listenAt('#popups', OverlayClick).forEach(evt => {
    if (!findParentByClass('popup', evt.target as Element))
      messages.send(props().onClose())
  })
}

function render(props: Props) {
  const { content } = props

  return (
    h('div', {
      content,
      attrs: { 'data-popup': true },
      hook: { insert, postpatch, destroy }
    })
  )
}

function insert(vnode: Vnode) {
  let target = popupContainer.children[0]

  if (!target) {
    target = document.createElement('div')
    popupContainer.appendChild(target)
  }

  const popup = vnode.data['_popup'] = popupWithContent(vnode.data['content'])

  patch(target, popup)
}

function postpatch(oldVnode: Vnode, vnode: Vnode) {
  const oldPopup = vnode.data['_popup']
  const newPopup = popupWithContent(vnode.data['content'])

  vnode.data['_popup'] = newPopup

  patch(oldPopup, newPopup)
}

function destroy(vnode: Vnode) {
  patch(vnode.data['_popup'], h('div'))
}

function popupWithContent(content: Array<Vnode>) {
  return (
    h('div.overlay', { hook: animationHook, events: { onClick: OverlayClick } }, [
      h('div.popup', content)
    ])
  )
}

const animationHook = {
  insert: (vnode: Vnode) => {
    TweenLite.from(vnode.elm, 0.2, { opacity: 0 })
    TweenLite.from(vnode.elm.children[0], 0.2, { opacity: 0, y: -20 })
  },

  remove: (vnode: Vnode, cb: Function) => {
    TweenLite.to(vnode.elm, 0.2, { opacity: 0 })
    TweenLite.to(vnode.elm.children[0], 0.2, { opacity: 0, y: -20 })
      .eventCallback('onComplete', cb)
  }
}
