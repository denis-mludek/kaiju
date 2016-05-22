import { Component, h, DomEvents, StreamSub } from 'dompteuse'
import update from 'immupdate'
import { Stream } from 'most'

import appState from './appState'
import red, { Opened } from './red'
import { merge } from './util'


export default function() {
  return Component({
    key: 'green',
    initState,
    connect,
    render
  })
}

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

function connect(on: StreamSub<State>, dom: DomEvents) {

  const formUpdate = dom.events('input', 'input').map(evt => {
    const { name, value } = evt.target as HTMLInputElement
    return { [name]: value.substr(0, 4) }
  })

  on(formUpdate, (state, patch) =>
    update(state, { form: patch })
  )

  on(appState, (state, appState) =>
    merge(state, { id: appState.route.params['id'] })
  )

  on(dom.events('.red', Opened), (state, _) =>
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
    red({ text: redText })
  ])
}

function input(name: string, value: string) {
  return h('label', [
    name,
    h('input', {
      props: { name },
      forceProps: { value }
    })
  ])
}
