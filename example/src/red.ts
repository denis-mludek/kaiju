import update from 'immupdate'
import { Component, h, Property, DomApi, makeState, Event } from 'dompteuse'

import appState, { incrementBlue } from './appState'
import { extend } from './util'


export default function(props?: Props) {
  return Component<Props, State>({
    key: 'red',
    props,
    connect,
    render
  })
}

// Custom event to indirectly communicate with parent components
export const Opened = Event('opened')

// Props passed by our parent
interface Props {
  openedByDefault?: boolean
  text?: string
}

const defaultProps = {
  openedByDefault: false,
  text: ''
}

// Our local state
interface State {
  opened: boolean
  text: string
}

function connect(dom: DomApi, props: Property<Props>) {
  const propsWithDefaults = props.map(p => extend(p, defaultProps))

  const text = propsWithDefaults.map(p => p.text)

  const opened = propsWithDefaults.take(1).flatMapFirst(p =>
    dom.onEvent('button', 'click').scan((opened, evt) => !opened, p.openedByDefault)
  ).toProperty()

  opened.skip(1).filter(v => v).onValue(v => dom.emit(Opened()))

  return makeState(
    [text, opened],
    (text, opened) => ({ text, opened })
  )
}

function render(state: State) {
  const { opened, text } = state

  return h('div.red', { class: { opened } }, [
    h('button', 'Toggle'),
    h('p', text)
  ])
}
