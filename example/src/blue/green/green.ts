import * as styles from './green.styl'

styles

import { Component, h, Message, ConnectParams } from 'dompteuse'
import update from 'immupdate'
import appStore from '../../appStore'
import { merge } from '../../util/obj'
import popup, * as Popup from '../../widget/popup'


export default function() {
  return Component({ name: 'green', initState, connect, render })
}


interface State {
  id: string
  form: any
  popupOpened: boolean
}

function initState() {
  return {
    id: appStore.state().route.params['id'],
    form: {},
    popupOpened: false
  }
}


const inputChanged = Message<Event>('inputChanged')
const showPopup = Message('showPopup')


function connect({ on }: ConnectParams<void, State>) {

  on(inputChanged, (state, evt) => {
    const { name, value } = evt.target as HTMLInputElement
    const formPatch = { [name]: value.substr(0, 4) }

    update(state, { form: formPatch })
  })

  on(appStore.state, (state, appState) =>
    merge(state, { id: appState.route.params['id'] })
  )

  on(showPopup, state => merge(state, { popupOpened: true }))
  on(Popup.close, state => merge(state, { popupOpened: false }))
}


function render(props: void, state: State) {
  const { id, form, popupOpened } = state
  const { firstName, lastName } = form

  const popupEl = popupOpened ? helloPopup() : ''

  return (
    h('div', [
      `Green (route id = ${id})`,
      h('form', [
        input('firstName', firstName),
        input('lastName', lastName)
      ]),
      h('button', { events: { onClick: showPopup } }, 'Open popup'),
      popupEl
    ])
  )
}

function input(name: string, value: string) {
  return (
    h('label', [
      name,
      h('input', {
        props: { name },
        forceProps: { value },
        events: { onInput: inputChanged }
      })
    ])
  )
}

function helloPopup() {
  const content = [
    h('h2', 'Hello'),
    h('button', { events: { onClick: Popup.close } }, 'Close')
  ]

  return popup({ content, onClose: Popup.close })
}
