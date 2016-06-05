import { Component, h, Message, ConnectParams } from 'dompteuse'
import update from 'immupdate'
import { Stream } from 'most'

import appState from './appState'
import { merge } from './util/obj'
import popup, * as Popup from './util/popup'


export default function() {
  return Component({
    key: 'green',
    initState,
    connect,
    render
  })
}

const InputChanged = Message<Event>('inputChanged')
const ShowPopup = Message('showPopup')

interface State {
  id: string
  form: any
  popupOpened: boolean
}

function initState() {
  return {
    id: appState.value.route.params['id'],
    form: {},
    popupOpened: false
  }
}

function connect({ on, messages }: ConnectParams<void, State>) {

  const formUpdate = messages.listen(InputChanged).map(evt => {
    const { name, value } = evt.target as HTMLInputElement
    return { [name]: value.substr(0, 4) }
  })

  on(formUpdate, (state, patch) =>
    update(state, { form: patch })
  )

  on(appState, (state, appState) =>
    merge(state, { id: appState.route.params['id'] })
  )

  on(ShowPopup, state => merge(state, { popupOpened: true }))
  on(Popup.Close, state => merge(state, { popupOpened: false }))
}

function render(props: void, state: State) {
  const { id, form, popupOpened } = state
  const { firstName, lastName } = form

  const popupEl = popupOpened ? helloPopup() : ''

  return h('div#green', [
    `Green (route id = ${id})`,
    h('form', [
      input('firstName', firstName),
      input('lastName', lastName)
    ]),
    h('button', { events: { onClick: ShowPopup } }, 'Open popup'),
    popupEl
  ])
}

function input(name: string, value: string) {
  return h('label', [
    name,
    h('input', {
      props: { name },
      forceProps: { value },
      events: { onInput: InputChanged }
    })
  ])
}

function helloPopup() {
  const content = [
    h('h2', 'Hello'),
    h('button', { events: { onClick: Popup.Close } }, 'Close')
  ]

  return popup({ content })
}
