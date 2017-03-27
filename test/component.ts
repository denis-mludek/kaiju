require('jsdom-global')()
global.requestAnimationFrame = (fn: Function) => setTimeout(fn, 1)

import * as expect from 'expect'
import { Component, h, startApp, Message, Render, ConnectParams, RenderParams, VNode, Messages } from '../'


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

function dispatchMouseEventOn(target: EventTarget, name: string) {
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

    expect(document.body.firstElementChild!.tagName).toBe('COMPONENT')
    expect(document.body.firstElementChild!.firstElementChild!.tagName).toBe('BUTTON')
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

    expect(document.body.firstElementChild!.tagName).toBe('TABLE')
    expect(document.body.firstElementChild!.className).toBe('large')
    expect(document.body.firstElementChild!.firstElementChild!.tagName).toBe('BUTTON')
  })


  it('can render an Array of VNodes', done => {

    let forceReRender: Function = () => {}

    const reRender = Message('reRender')

    const bag = (() => {

      function initState() { return {} }

      function connect({ on, msg }: ConnectParams<{}, {}>) {
        forceReRender = () => msg.send(reRender())

        on(reRender, () => ({ swap: true }))
      }

      function render({ state }: RenderParams<{}, any>) {
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

    const comp = document.body.firstElementChild!
    expect(comp.tagName).toBe('COMPONENT')
    expect(comp.children[0].tagName).toBe('BUTTON')
    expect(comp.children[1].tagName).toBe('DIV')
    expect(comp.children[2].tagName).toBe('SPAN')
    const buttonEl = comp.children[0]
    const spanEl = comp.children[2]

    forceReRender()

    requestAnimationFrame(() => {
      // The component node is stable
      const newComp = document.body.firstElementChild
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
      const clickMsg = Message<Event>('click')
      const mouseDownMsg = Message<[Event, number]>('mousedown')

      function initState() { return {} }

      function connect({ on }: ConnectParams<{}, {}>) {
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

    const divEl = document.body.firstElementChild!.firstElementChild!

    expect(divEl.tagName).toBe('DIV')

    dispatchMouseEventOn(divEl, 'click')
    expect(receivedClickMessage).toBe(true)

    dispatchMouseEventOn(divEl, 'mousedown')
    expect(receivedMouseDownMessage).toBe(true)
  })


  it('can forward some messages to its parent', () => {

    const local = Message<Event>('local')
    const forwarded = Message<Event>('forwarded')
    const unknown = Message<Event>('unknown')

    const receivedMessages: string[] = []

    const parent = (() => {

      type Props = { children: VNode[] }

      function initState() { return {} }

      function connect({ on }: ConnectParams<Props, {}>) {
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

      function render({ props }: RenderParams<Props, {}>) {
        return h('div', props.children)
      }

      return function(props: Props) {
        return Component({ name: 'div', props, initState, connect, render })
      }
    })()


    const child = (() => {

      function initState() { return { bla: 33 } }

      function connect({ on, msg }: ConnectParams<{}, {}>) {
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

    const parentDiv = document.body.firstElementChild!.firstElementChild!
    const childDiv = parentDiv.firstElementChild!.firstElementChild!

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

    let calls: string[] = []
    let forceReRender: Function[] = []

    const input = (() => {
      const reRender = Message('reRender')

      function initState() { return {} }
      function connect({ msg, on }: ConnectParams<{}, {}>) {
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

      function onInsert(vnode: VNode) {
        Render.scheduleDOMRead(() => {
          calls.push('scheduleDOMReadFromInsert')
          let height = vnode.elm.clientHeight

          Render.scheduleDOMWrite(() => {
            calls.push('scheduleDOMWriteFromInsert')
            ;(vnode.elm as HTMLElement).style.height = '' + height + 20

            Render.scheduleDOMRead(() => {
              calls.push('scheduleDOMReadFromInsert2')
            })

          })
        })

        calls.push('onInsert')
      }

      function onUpdate(_: VNode, vnode: VNode) {
        Render.scheduleDOMRead(() => {
          calls.push('scheduleDOMReadFromUpdate')
          let height = vnode.elm.clientHeight

          Render.scheduleDOMWrite(() => {
            calls.push('scheduleDOMWriteFromUpdate')
            ;(vnode.elm as HTMLElement).style.height = '' + height + 20

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


  it('can pre-bind a message with its payload', done => {

    let compMsg: Messages
    const texts: string[] = []

    const ping = Message<[Event, string]>('ping')

    const comp = (() => {
      function initState() { return {} }

      function connect({ on, msg }: ConnectParams<{}, {}>) {
        compMsg = msg

        on(ping, (state, [evt, text]) => {
          expect(evt.currentTarget).toNotBe(undefined!)
          texts.push(text)
        })
      }

      function render() {
        return h('main', {
          events: { click: ping.with('ping') }
        })
      }

      return function() {
        return Component({ name: 'parent', initState, connect, render })
      }
    })()

    Render.into(document.body, comp(), () => {
      dispatchMouseEventOn(document.querySelector('main')!, 'click')

      expect(texts).toEqual(['ping'])

      compMsg.send(ping.with('pong')(new Event('click')))

      expect(texts).toEqual(['ping', 'pong'])

      done()
    })

  })


  it('can listen to any messages transiting through a DOM Element', done => {
    const receivedMessages: string[] = []

    const messageFromTheRight = Message<[Event, string]>('messageFromTheRight')
    const messageFromTheRight2 = Message<[Event, string]>('messageFromTheRight2')

    const leftEl = document.createElement('main')
    document.body.appendChild(leftEl)

    const rightEl = document.createElement('aside')
    document.body.appendChild(rightEl)

    const left = (() => {
      function initState() { return {} }

      function connect({ on, msg }: ConnectParams<{}, {}>) {

        on(msg.listenAt(rightEl), (state, message) => {

          if (message.is(messageFromTheRight)) {
            expect(message.payload[0].currentTarget).toExist()
            receivedMessages.push(message.payload[1])
          }
          
          else if (message.is(messageFromTheRight2)) {
            expect(message.payload[0].currentTarget).toExist()
            receivedMessages.push(message.payload[1])
          }
        })

      }

      function render({ msg }: RenderParams<{}, {}>) {
        return h('span')
      }

      return function() {
        return Component({ name: 'left', initState, connect, render })
      }
    })()

    const right = (() => {

      function initState() { return {} }

      function connect({ on, msg }: ConnectParams<{}, {}>) {

        on(Message.unhandled, (state, payload) => {
          msg.sendToParent(payload)
        })

      }

      function render() {
        return h('span#right', {
          events: {
            click: messageFromTheRight.with('hello'),
            mousedown: messageFromTheRight2.with('goodbye')
          }
        })
      }

      return function() {
        return Component({ name: 'right', initState, connect, render })
      }
    })()

    Render.into(rightEl, right())

    Render.into(leftEl, left(), () => {
      const rightSpan = rightEl.querySelector('#right')!

      dispatchMouseEventOn(rightSpan, 'click')
      dispatchMouseEventOn(rightSpan, 'mousedown')

      expect(receivedMessages).toEqual(['hello', 'goodbye'])

      done()
    })
  })

})
