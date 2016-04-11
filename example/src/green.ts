import { Component, h, StateApi, Property, kefir } from 'dompteuse';
import update from 'immupdate';

import appState from './appState';


export default function() {
  return Component({
    key: 'green',
    state,
    render
  });
};

interface State {
  id: string;
  inputs: any;
}

function state(dom: StateApi) {
  const inputs = dom.onEvent('input', 'input')
    .map(evt => {
      const { name, value } = evt.target as HTMLInputElement;
      return { [name]: value.substr(0, 4) };
    })
    .scan((inputs, diff) => update(inputs, diff), {});

  const routeId = appState.map(state => state.route.params['id']);

  return inputs.combine(routeId, (inputs, id) => ({ inputs, id })).toProperty();
}

function render(state: State) {
  const { id, inputs } = state;
  const { firstName, lastName } = inputs;

  return h('div#green', [
    `Green (route id = ${id})`,
    h('form', [
      input('firstName', firstName),
      input('lastName', lastName)
    ])
  ]);
}

function input(name: string, value: string) {
  return h('label', [
    name,
    h('input', {
      props: { name },
      forceProps: { value }
    })
  ]);
}
