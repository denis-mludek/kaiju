require('jsdom-global')()
global.requestAnimationFrame = fn => setTimeout(fn, 1)

import expect from 'expect'
import { Component, h, startApp, Message, Render } from '../src/main'


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
    document.body.innerHTML = ''
  })


  it('is a regular VDOM node', () => {

    expect(button().sel).toBe('component')

    startApp({ app: button(), elm: document.body, snabbdomModules })

    expect(document.body.firstChild.tagName).toBe('COMPONENT')
    expect(document.body.firstChild.firstChild.tagName).toBe('BUTTON')
  })


  it('can render with a custom selector', () => {

    const table = (() => {
      function initState() { return {} }
      function connect() {}

      function render() {
        return h('button')
      }

      return function() {
        return Component({ sel: 'table.large', name: 'table', initState, connect, render })
      }
    })()

    expect(table().sel).toBe('table.large')

    startApp({ app: table(), elm: document.body, snabbdomModules })

    expect(document.body.firstChild.tagName).toBe('TABLE')
    expect(document.body.firstChild.className).toBe('large')
    expect(document.body.firstChild.firstChild.tagName).toBe('BUTTON')
  })


  it('can render an Array of VNodes', done => {

    let forceReRender

    const reRender = Message('reRender')

    const bag = (() => {

      function initState() { return {} }

      function connect({ on, msg }) {
        forceReRender = () => msg.send(reRender())

        on(reRender, () => ({ swap: true }))
      }

      function render({ state }) {
        return [
          h('button'),
          h(state.swap ? 'p' : 'div'),
          h('span')
        ]
      }

      return function() {
        return Component({ name: 'bag', initState, connect, render })
      }
    })()

    startApp({ app: bag(), elm: document.body, snabbdomModules })

    const comp = document.body.firstChild
    expect(comp.tagName).toBe('COMPONENT')
    expect(comp.children[0].tagName).toBe('BUTTON')
    expect(comp.children[1].tagName).toBe('DIV')
    expect(comp.children[2].tagName).toBe('SPAN')
    const buttonEl = comp.children[0]
    const spanEl = comp.children[2]

    forceReRender()

    requestAnimationFrame(() => {
      // The component node is stable
      const newComp = document.body.firstChild
      expect(newComp).toBe(comp)

      // Test the patching occurs properly
      expect(comp.children[0].tagName).toBe('BUTTON')
      expect(comp.children[1].tagName).toBe('P')
      expect(comp.children[2].tagName).toBe('SPAN')

      // No reason for these to have changed reference
      expect(comp.children[0]).toBe(buttonEl)
      expect(comp.children[2]).toBe(spanEl)

      done()
    })
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

        on(forwarded, (state, evt) => {
          expect(evt.currentTarget).toExist()
          receivedMessages.push('childForwarded')
          msg.sendToParent(forwarded(evt))
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


  it('can schedule DOM manipulations without causing layout trashing', done => {

    let calls = []
    let forceReRender = []

    const input = (() => {
      const reRender = Message('reRender')

      function initState() { return {} }
      function connect({ msg, on }) {
        forceReRender.push(() => msg.send(reRender()))

        calls.push('connect')

        Render.scheduleDOMRead(() => {
          calls.push('scheduleDOMReadFromConnect')
        })

        on(reRender, _ => ({ swap: true }))
      }

      function render() {
        calls.push('render')

        return h('input', {
          hook: {
            insert: onInsert,
            update: onUpdate
          }
        })
      }

      function onInsert(vnode) {
        Render.scheduleDOMRead(() => {
          calls.push('scheduleDOMReadFromInsert')
          let height = vnode.elm.clientHeight

          Render.scheduleDOMWrite(() => {
            calls.push('scheduleDOMWriteFromInsert')
            vnode.elm.style.height = height + 20

            Render.scheduleDOMRead(() => {
              calls.push('scheduleDOMReadFromInsert2')
            })

          })
        })

        calls.push('onInsert')
      }

      function onUpdate(_, vnode) {
        Render.scheduleDOMRead(() => {
          calls.push('scheduleDOMReadFromUpdate')
          let height = vnode.elm.clientHeight

          Render.scheduleDOMWrite(() => {
            calls.push('scheduleDOMWriteFromUpdate')
            vnode.elm.style.height = height + 20

            Render.scheduleDOMRead(() => {
              calls.push('scheduleDOMReadFromUpdate2')
            })

          })
        })

        calls.push('onUpdate')
      }

      return function() {
        return Component({ name: 'input', initState, connect, render })
      }
    })()

    startApp({
      app: h('nav', [input(), input(), input()]),
      elm: document.body,
      snabbdomModules
    })

    expect(calls).toEqual([
      'connect', 'connect', 'connect',
      'render', 'onInsert', 'render', 'onInsert', 'render', 'onInsert',
      'scheduleDOMReadFromConnect', 'scheduleDOMReadFromConnect', 'scheduleDOMReadFromConnect',
      'scheduleDOMReadFromInsert', 'scheduleDOMReadFromInsert', 'scheduleDOMReadFromInsert',
      'scheduleDOMWriteFromInsert', 'scheduleDOMWriteFromInsert', 'scheduleDOMWriteFromInsert',
      'scheduleDOMReadFromInsert2', 'scheduleDOMReadFromInsert2', 'scheduleDOMReadFromInsert2'
    ])

    calls = []

    forceReRender.forEach(fn => fn())

    requestAnimationFrame(() => {
      expect(calls).toEqual([
        'render', 'onUpdate', 'render', 'onUpdate', 'render', 'onUpdate',
        'scheduleDOMReadFromUpdate', 'scheduleDOMReadFromUpdate', 'scheduleDOMReadFromUpdate',
        'scheduleDOMWriteFromUpdate', 'scheduleDOMWriteFromUpdate', 'scheduleDOMWriteFromUpdate',
        'scheduleDOMReadFromUpdate2', 'scheduleDOMReadFromUpdate2', 'scheduleDOMReadFromUpdate2'
      ])

      done()
    })

  })

})
