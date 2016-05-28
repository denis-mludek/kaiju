import { Component, h, Message, ConnectParams } from 'dompteuse'
import update from 'immupdate'
import { Stream } from 'most'

import appState from './appState'
import red from './red'
import { merge } from './util/util'


export default function() {
  return Component({
    key: 'green',
    initState,
    connect,
    render
  })
}

const InputChanged = Message<Event>('inputChanged')
const RedOpened = Message('redOpened')

interface State {
  id: string
  form: any
  redText: string
}

function initState() {
  return {
    id: appState.value.route.params['id'],
    form: {},
    redText: ''
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

  on(RedOpened, state =>
    merge(state, { redText: state.redText + ' Opened!' })
  )
}

function render(props: void, state: State) {
  const { id, form, redText } = state
  const { firstName, lastName } = form

  return h('div#green', [
    `Green (route id = ${id})`,
    h('form', [
      input('firstName', firstName),
      input('lastName', lastName)
    ]),
    red({
      text: redText,
      onOpened: RedOpened
    })
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
