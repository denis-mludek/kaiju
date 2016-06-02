import update from 'immupdate'
import { Component, h, Message, ConnectParams } from 'dompteuse'
import { Stream } from 'most'

import appState, { incrementBlue } from './appState'
import { merge } from './util/obj'


export default function(props?: Props) {
  return Component({
    key: 'red',
    props,
    defaultProps,
    initState,
    connect,
    render
  })
}


const ToggleOpen = Message('toggleOpen')

interface Props {
  openedByDefault?: boolean
  text?: string,
  onOpened?: () => any
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

function connect({ on, props, messages }: ConnectParams<Props, State>) {
  // This is actually quite unconventional:
  // state is usually fully owned locally OR externally. Just an example.
  on(ToggleOpen, state => {
    const opened = !state.opened
    if (opened) {
      const { onOpened } = props()
      onOpened && messages.send(onOpened())
    }
    return merge(state, { opened })
  })
}

function render(props: Props, state: State) {
  const { text } = props
  const { opened } = state

  return h('div.red', { class: { opened } }, [
    h('button', { events: { onClick: ToggleOpen } }, 'Toggle'),
    h('p', text)
  ])
}
