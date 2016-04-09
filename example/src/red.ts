import update from 'immupdate';
import { Component, h, Property, StateApi } from 'dompteuse';

import { contentAnimation } from './animation';
import appState, { incrementBlue } from './appState';
import { extend } from './util';


export default function(props?: Props) {
  return Component({
    key: 'red',
    props,
    state,
    render
  });
};

// Props passed by our parent
interface Props {
  openedByDefault: boolean;
}

const defaultProps = {
  openedByDefault: false
};

// Our local state
interface State {
  opened: boolean;
}

function state(dom: StateApi, props: Property<Props>) {
  return props.map(p => extend(defaultProps, p)).flatMapFirst(p =>
    dom.onEvent('button', 'click')
      .scan((opened, evt) => !opened, p.openedByDefault)
      .map(opened => ({ opened }))
  ).toProperty();
}

function render(state: State) {
  const { opened } = state;

  return h('div.red', { hook: contentAnimation, class: { opened } }, [
    h('button', 'Toggle')
  ]);
}
