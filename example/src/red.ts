import update from 'immupdate'
import { Component, h, DomApi, Event } from 'dompteuse'
import xs, { MemoryStream } from 'xstream'

import appState, { incrementBlue } from './appState'
import { extend } from './util'


export default function(props?: Props) {
  return Component({
    key: 'red',
    props,
    defaultProps,
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

// TODO remove
const noop = () => {}
function onValue(stream: any, cb: any) {
  stream.addListener({ next: cb, error: noop, complete: noop })
}

function connect(dom: DomApi, props: MemoryStream<Props>): MemoryStream<State> {
  const opened = props.take(1).map(p =>
    dom.onEvent('button', 'click').fold((opened, evt) => !opened, p.openedByDefault)
  ).flatten().remember()

  onValue(opened.drop(1).filter(v => v), v => dom.emit(Opened()))

  return xs.combine(
    (props, opened) => ({ text: props.text, opened }),
    props, opened
  ).remember()
}

function render(state: State) {
  const { opened, text } = state

  return h('div.red', { class: { opened } }, [
    h('button', 'Toggle'),
    h('p', text)
  ])
}
