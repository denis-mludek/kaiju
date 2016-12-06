const styles = require('./green.styl')
const listStyles = require('./list.styl')

import { Component, h, Message, ConnectParams, RenderParams, Hook } from 'kaiju'
import update from 'immupdate'
import { editIcon } from '../../../icon'
import popup, * as Popup from '../../../widget/popup'
import button from '../../../widget/button'
import groupFadeAnimation from '../../../util/animation/groupFade'
import * as routes from '../../../router'
import { RouteWithParams } from '../../../router'


export default function(props: Props) {
  return Component<Props, State>({ name: 'green', props, initState, connect, render })
}


interface Props {
  route: RouteWithParams<typeof routes.green.params>
}

interface State {
  form: Obj<string>
  popupOpened: boolean
}


function initState(props: Props) {
  return {
    form: {},
    popupOpened: !!props.route.params['popup']
  }
}


const inputChanged = Message<Event>('inputChanged')
const showPopup = Message('showPopup')


function connect({ on, props }: ConnectParams<Props, State>) {

  on(inputChanged, (state, evt) => {
    const { name, value } = evt.target as HTMLInputElement
    const formPatch = { [name]: value.substr(0, 4) }
    return update(state, { form: formPatch })
  })

  on(showPopup, state => {
    const params = update(props().route.params, { popup: 'true' })
    routes.replaceParams(params)
    return update(state, { popupOpened: true })
  })

  on(Popup.close, state => {
    const params = update(props().route.params, { popup: undefined })
    routes.replaceParams(params)
    return update(state, { popupOpened: false })
  })
}


function render({ props, state }: RenderParams<Props, State>) {
  const { route } = props
  const { form, popupOpened } = state
  const { firstName, lastName } = form

  const popupEl = popupOpened ? helloPopup() : ''

  return (
    h('div', [
      `Green (route id = ${route.params.id})`,
      h('form', [
        input('firstName', firstName, true),
        input('lastName', lastName)
      ]),

      button({
        className: styles.popupButton,
        icon: editIcon(),
        label: 'Open popup',
        events: { mousedown: showPopup }
      }),

      popupEl
    ])
  )
}

function input(name: string, value: string, shouldAutoFocus = false) {
  const hook: Hook | undefined = shouldAutoFocus
    ? { insert: node => node.elm.focus() }
    : undefined

  return (
    h('label', [
      name,
      h(`input.${styles.input}`, {
        props: { name },
        hook,
        forceProps: { value },
        events: { input: inputChanged }
      }, '')
    ])
  )
}

function helloPopup() {
  const content = [
    h('h2', 'Hello'),
    list({ initialItems: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }),
    h('button', { events: { click: Popup.close } }, 'Close')
  ]

  return popup({ content, onClose: Popup.close })
}


const list = (() => {

  interface Props {
    initialItems: number[]
  }

  interface State {
    items: number[]
  }

  function initState(props: Props) {
    return { items: props.initialItems }
  }

  const deleteRow = Message<[MouseEvent, number]>('deleteRow')

  function connect({ on }: ConnectParams<Props, State>) {
    on(deleteRow, (state, [_, row]) => ({ items: state.items.filter(r => r !== row) }))
  }

  function render({ state }: RenderParams<Props, State>) {

    const itemEls = state.items.map(item => (
      h('li', { key: item }, [
        h('span', String(item)),
        h('input', { props: { value: 'bla' } }),
        h('button', { events: { click: deleteRow.with(item) } }, '✕')
      ])
    ))

    return groupFadeAnimation(`ul.${listStyles.list}`, itemEls)
  }

  return (props: Props) => {
    return Component<Props, State>({ name: 'list', initState, connect, props, render })
  }
})()
