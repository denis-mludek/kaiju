import update from 'immupdate'
import { Component, h, StreamSub, DomEvents, Event } from 'dompteuse'
import { Stream } from 'most'

import appState, { incrementBlue } from './appState'
import { merge } from './util'


export default function(props?: Props) {
  return Component({
    key: 'red',
    props,
    initState,
    defaultProps,
    connect,
    render
  })
}

export const Opened = Event('opened')

interface Props {
  openedByDefault?: boolean
  text?: string
}

const defaultProps = {
  openedByDefault: false,
  text: ''
}

interface State {
  opened: boolean
}

function initState(props: Props) {
  return {
    opened: props.openedByDefault,
    text: ''
  }
}

function connect(on: StreamSub<State>, dom: DomEvents) {
  on(dom.events('button', 'click'), state => {
    const opened = !state.opened
    if (opened) dom.emit(Opened())
    return merge(state, { opened })
  })
}

function render(props: Props, state: State) {
  const { text } = props
  const { opened } = state

  return h('div.red', { class: { opened } }, [
    h('button', 'Toggle'),
    h('p', text)
  ])
}
