import { Component, h, DomApi } from 'dompteuse'
import update from 'immupdate'
import xs, { MemoryStream } from 'xstream'

import appState from './appState'
import red, { Opened } from './red';


export default function() {
  return Component({
    key: 'green',
    connect,
    render
  })
}

interface State {
  id: string
  form: any
  redText: string
}

function connect(dom: DomApi): MemoryStream<State> {
  const form = getFormState(dom)
  const id = appState.map(state => state.route.params['id'])
  const redText = dom.onEvent('.red', Opened).fold((current, _) => current + ' Opened!', '')

  return xs.combine(
    (form, id, redText) => ({ form, id, redText }),
    form, id, redText
  ).remember()
}

function render(state: State) {
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

function getFormState(dom: DomApi) {
  return dom.onEvent('input', 'input')
    .map(evt => {
      const { name, value } = evt.target as HTMLInputElement
      return { [name]: value.substr(0, 4) }
    })
    .fold((form, diff) => update(form, diff), {})
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
