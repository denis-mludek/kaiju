import { Component, h, DomApi, Property, kefir } from 'dompteuse'
import update from 'immupdate'

import appState from './appState'


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
}

function connect(dom: DomApi) {
  const form = getFormState(dom)
  const id = appState.map(state => state.route.params['id'])

  return kefir.combine(
    [form, id],
    (form, id) => ({ form, id })
  ).toProperty()
}

function render(state: State) {
  const { id, form } = state
  const { firstName, lastName } = form

  return h('div#green', [
    `Green (route id = ${id})`,
    h('form', [
      input('firstName', firstName),
      input('lastName', lastName)
    ])
  ])
}

function getFormState(dom: DomApi) {
  return dom.onEvent('input', 'input')
    .map(evt => {
      const { name, value } = evt.target as HTMLInputElement
      return { [name]: value.substr(0, 4) }
    })
    .scan((inputs, diff) => update(inputs, diff), {})
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
