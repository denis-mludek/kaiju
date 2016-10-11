const styles = require('./popup.styl')

import { h, Component, Vnode, Message, NoArgMessage, ConnectParams, RenderParams, patch, isFirstRender } from 'kaiju'
import { findParentByAttr } from '../../util/dom'


// Popups are rendered in their own top-level container for clean separation of layers.
let popupContainer = document.getElementById('popups')!

interface Props {
  content: Vnode[]
  onClose: NoArgMessage
}

export default function(props: Props) {
  return Component<Props, void>({ name: 'popup', props, initState, connect, render })
}

function initState() {
  return {}
}


export const close = Message('close')
const overlayClick = Message<Event>('overlayClick')


// Listen for messages inside the popup container, and redispatch at the Popup launcher level.
function connect({ on, props, msg }: ConnectParams<Props, void>) {

  on(msg.listenAt('#popups', close), () => {
    msg.sendToParent(props().onClose())
  })

  on(msg.listenAt('#popups', overlayClick), (state, evt) => {
    if (!findParentByAttr('data-popup', evt.target as Element))
      msg.sendToParent(props().onClose())
  })
}


function render({ props }: RenderParams<Props, void>) {
  const { content } = props

  return (
    h('div', {
      content,
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
    h(`div.${styles.container}`, {
      key: 'popup-content',
      hook: isFirstRender() ? { remove: removeAnimation } : { insert: insertAnimation, remove: removeAnimation },
      events: { click: overlayClick } }, [

      h(`div.${styles.overlay}`),

      h(`div.${styles.popup}`, {
        attrs: { 'data-popup': true }
      }, content)
    ])
  )
}


const insertAnimation = (vnode: Vnode) => {
  const [overlay, popup] = vnode.elm.children as any as HTMLElement[]

  overlay.animate(
    { opacity: [0, 1] },
    { duration: 300, easing: 'cubic-bezier(0.2, 0.6, 0.3, 1)' }
  )

  popup.animate(
    { transform: ['scale(0.7)', 'scale(1)'], opacity: [0, 1] },
    { duration: 300, easing: 'cubic-bezier(0.2, 0.6, 0.3, 1)' }
  )
}

const removeAnimation = (vnode: Vnode, cb: Function) => {
  const [overlay, popup] = vnode.elm.children as any as HTMLElement[]

  overlay.animate(
    { opacity: [1, 0] },
    { duration: 140, easing: 'linear', fill: 'forwards' }
  )

  popup.animate(
    { transform: ['scale(1)', 'scale(0.7)'], opacity: [1, 0] },
    { duration: 140, easing: 'linear', fill: 'forwards' }
  ).onfinish = cb
}
