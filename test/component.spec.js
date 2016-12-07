require('jsdom-global')()
import expect from 'expect'
import { Component, h, patch, startApp, Message } from '../src/main'


/** Utils **/

const snabbdomModules = [
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/attributes')
]

const button = (() => {
  function initState() { return {} }
  function connect() {}

  function render() {
    return h('button')
  }

  return function() {
    return Component({ name: 'button', initState, connect, render })
  }
})()

function dispatchMouseEventOn(target, name) {
  const evt = new MouseEvent(name)
  target.dispatchEvent(evt)
}


/** Tests **/

describe('Component', () => {

  afterEach(() => {
    document.body.removeChild(document.body.firstChild)
  })

  it('is a regular VDOM node', () => {

    expect(button().sel).toBe('component')

    startApp({ app: button(), elm: document.body, snabbdomModules })

    expect(document.body.firstChild.tagName).toBe('COMPONENT')
    expect(document.body.firstChild.firstChild.tagName).toBe('BUTTON')
  })


  it('can receive local messages', () => {

    let receivedClickMessage = false
    let receivedMouseDownMessage = false

    const div = (() => {
      const clickMsg = Message('click')
      const mouseDownMsg = Message('mousedown')

      function initState() { return {} }

      function connect({ on }) {
        on(clickMsg, (state, evt) => {
          expect(evt.currentTarget).toExist()
          receivedClickMessage = true
        })

        on(mouseDownMsg, (state, [evt, data]) => {
          expect(evt.currentTarget).toExist()
          expect(data).toBe(13)
          receivedMouseDownMessage = true
        })
      }

      function render() {
        return h('div', {
          events: {
            click: clickMsg,
            mousedown: mouseDownMsg.with(13)
          }
        })
      }

      return function() {
        return Component({ name: 'div', initState, connect, render })
      }
    })()

    startApp({ app: div(), elm: document.body, snabbdomModules })

    const divEl = document.body.firstChild.firstChild

    expect(divEl.tagName).toBe('DIV')

    dispatchMouseEventOn(divEl, 'click')
    expect(receivedClickMessage).toBe(true)

    dispatchMouseEventOn(divEl, 'mousedown')
    expect(receivedMouseDownMessage).toBe(true)
  })


  it('can forward some messages to its parent', () => {

    const local = Message('local')
    const forwarded = Message('forwarded')
    const unknown = Message('unknown')

    const receivedMessages = []

    const parent = (() => {

      function initState() { return {} }

      function connect({ on }) {
        on(local, (state, evt) => {
          // Should not happen
          receivedMessages.push('parentLocal')
        })

        on(forwarded, (state, evt) => {
          expect(evt.currentTarget).toExist()
          receivedMessages.push('parentForwarded')
        })

        on(unknown, (state, evt) => {
          expect(evt.currentTarget).toExist()
          receivedMessages.push('parentUnknown')
        })

        on(Message.unhandled, (state, message) => {
          // Should not happen
          receivedMessages.push('parentUnhandled')
        })
      }

      function render({ props }) {
        return h('div', props.children)
      }

      return function(props) {
        return Component({ name: 'div', props, initState, connect, render })
      }
    })()


    const child = (() => {

      function initState() { return { bla: 33 } }

      function connect({ on, msg }) {
        on(local, (state, evt) => {
          expect(evt.currentTarget).toExist()
          receivedMessages.push('childLocal')
        })

        on(forwarded, (state, evt, message) => {
          expect(evt.currentTarget).toExist()
          receivedMessages.push('childForwarded')
          msg.sendToParent(message)
        })

        on(Message.unhandled, (state, message) => {
          expect(state).toEqual({ bla: 33 })
          receivedMessages.push('childUnknown')
          msg.sendToParent(message)
        })
      }

      function render() {
        return h('div', {
          events: {
            mousedown: local,
            mouseup: forwarded,
            click: unknown
          }
        })
      }

      return function() {
        return Component({ name: 'div', initState, connect, render })
      }
    })()

    startApp({
      app: parent({ children: [child()] }),
      elm: document.body,
      snabbdomModules
    })

    const parentDiv = document.body.firstChild.firstChild
    const childDiv = parentDiv.firstChild.firstChild

    dispatchMouseEventOn(childDiv, 'mousedown')
    dispatchMouseEventOn(childDiv, 'mouseup')
    dispatchMouseEventOn(childDiv, 'click')

    expect(receivedMessages).toEqual([
      'childLocal',
      'childForwarded', 'parentForwarded',
      'childUnknown', 'parentUnknown'
    ])
  })

})
