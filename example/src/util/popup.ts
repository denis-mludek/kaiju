
import { h, Component, Vnode, Message, NoArgMessage, ConnectParams, patch } from 'dompteuse'
import anime from 'animejs'

import { findParentByClass } from './dom'


// Popups are rendered in their own top-level container for clean separation of layers.
let popupContainer = document.getElementById('popups')

interface Props {
  content: Array<Vnode>
  onClose: NoArgMessage
}

export default function(props: Props) {
  return Component<Props, void>({ key: 'popup', props, initState, connect, render })
}

function initState() {
  return {}
}


export const Close = Message('Close')
const OverlayClick = Message<Event>('OverlayClick')


// Listen for messages inside the popup container, and redispatch at the Popup launcher level.
function connect({ on, props, msg }: ConnectParams<Props, void>) {

  on(msg.listenAt('#popups', Close), () => {
    msg.sendToParent(props().onClose())
  })

  on(msg.listenAt('#popups', OverlayClick), (state, evt) => {
    if (!findParentByClass('popup', evt.target as Element))
      msg.sendToParent(props().onClose())
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

    vnode.elm.style.opacity = '0'
    anime(vnode.elm, {
      duration: 200,
      opacity: [0, 1]
    })

    const popup = vnode.elm.children[0] as HTMLElement
    popup.style.opacity = '0'
    anime(popup, {
      duration: 200,
      delay: 200,
      opacity: [0, 1],
      translateY: ['-20px', '0px']
    })
  },

  remove: (vnode: Vnode, cb: Function) => {

    anime(vnode.elm, {
      duration: 200,
      opacity: 0
    })

    anime(vnode.elm.children[0], {
      duration: 200,
      opacity: 0,
      translateY: '-20px',
      complete: cb
    })
  }
}
