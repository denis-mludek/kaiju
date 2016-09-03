require('./green.styl')

import { Component, h, Message, ConnectParams, RenderParams } from 'kaiju'
import update from 'immupdate'
import popup, * as Popup from '../../widget/popup'
import * as routes from '../../router'


export default function(props: Props) {
  return Component<Props, State>({ name: 'green', props, initState, connect, render })
}


interface Props {
  id: string
}

interface State {
  form: any
  popupOpened: boolean
}

function initState() {
  return {
    form: {},
    popupOpened: !!routes.current().params['popup']
  }
}


const inputChanged = Message<Event>('inputChanged')
const showPopup = Message('showPopup')


function connect({ on }: ConnectParams<Props, State>) {

  on(inputChanged, (state, evt) => {
    const { name, value } = evt.target as HTMLInputElement
    const formPatch = { [name]: value.substr(0, 4) }
    return update(state, { form: formPatch })
  })

  on(showPopup, state => {
    const params = update(routes.current().params, { popup: 'true' })
    routes.replaceParams(params)
    return update(state, { popupOpened: true })
  })

  on(Popup.close, state => {
    const params = update(routes.current().params, { popup: undefined })
    routes.replaceParams(params)
    return update(state, { popupOpened: false })
  })
}


function render({ props, state }: RenderParams<Props, State>) {
  const { id } = props
  const { form, popupOpened } = state
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
