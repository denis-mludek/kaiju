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

    expect(document.body.children[0].tagName).toBe('COMPONENT')
    expect(document.body.children[0].children[0].tagName).toBe('BUTTON')
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

    const divEl = document.body.children[0].children[0]

    expect(divEl.tagName).toBe('DIV')

    dispatchMouseEventOn(divEl, 'click')
    expect(receivedClickMessage).toBe(true)

    dispatchMouseEventOn(divEl, 'mousedown')
    expect(receivedMouseDownMessage).toBe(true)
  })

})
