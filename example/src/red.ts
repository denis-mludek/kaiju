import update from 'immupdate'
import { Component, h, Property, DomApi } from 'dompteuse'

import appState, { incrementBlue } from './appState'
import { extend } from './util'


export default function(props?: Props) {
  return Component({
    key: 'red',
    props,
    connect,
    render
  })
}

// Props passed by our parent
interface Props {
  openedByDefault: boolean
}

const defaultProps = {
  openedByDefault: false
}

// Our local state
interface State {
  opened: boolean
}

function connect(dom: DomApi, props: Property<Props>) {
  const initialProps = props.take(1).map(p => extend(defaultProps, p))

  return initialProps.flatMapFirst(p =>
    dom.onEvent('button', 'click')
      .scan((opened, evt) => !opened, p.openedByDefault)
      .map(opened => ({ opened }))
  )
  .toProperty()
}

function render(state: State) {
  const { opened } = state

  return h('div.red', { class: { opened } }, [
    h('button', 'Toggle')
  ])
}
