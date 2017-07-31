require('jsdom-global')()
global.requestAnimationFrame = (fn: Function) => setTimeout(fn, 1)

import * as expect from 'expect'
import { Render, h, Component, startApp, VNode } from '..'


describe('Render', () => {

  describe('into', () => {

    afterEach(() => {
      document.body.innerHTML = ''
    })

    it('can render a VNode into an element', done => {

      const vnode = h('span#daSpan')

      // Creation
      Render.into(document.body, vnode, () => {
        const span = document.body.firstElementChild!

        expect(span.tagName).toBe('SPAN')
        expect(span.id).toBe('daSpan')

        // Update
        Render.into(vnode, h('span#daSpan', 'hello'), () => {
          expect(span.tagName).toBe('SPAN')
          expect(span.id).toBe('daSpan')
          expect(span.textContent).toBe('hello')

          done()
        })
      })

    })


    it('can render an Array of VNodes into an element', done => {

      const init = [
        h('span'),
        undefined,
        h('div'),
        null,
        'some text',
      ]

      // Creation
      Render.into(document.body, init, () => {
        const [span, div, text] = Array.from(document.body.childNodes)

        expect((span as HTMLElement).tagName).toBe('SPAN')
        expect((div as HTMLElement).tagName).toBe('DIV')
        expect(text).toExist()
        expect(text.textContent).toBe('some text')

        const updated = [
          h('span'),
          h('input'),
          'some text (2)'
        ]

        // Update 1: Swap the middle element
        Render.into(init, updated, () => {
          const [updatedSpan, input, updatedText] = Array.from(document.body.childNodes)

          expect(updatedSpan).toBe(span)
          expect((input as HTMLElement).tagName).toBe('INPUT')
          expect(updatedText).toBe(text)
          expect(updatedText.textContent).toBe('some text (2)')

          const emptyNodes: VNode[] = []

          // Update 2: Empty array
          Render.into(updated, emptyNodes, () => {
            expect(document.body.children.length).toBe(0)

            // Update 3: Go back to the second VNode structure
            Render.into(emptyNodes, updated, () => {
              expect(document.body.childNodes.length).toBe(3)
              done()
            })
          })

        })
      })
    })


    it('can be cancelled', done => {

      const cancel = Render.into(document.body, h('span'))
      cancel()

      setTimeout(() => {
        expect(document.body.children.length).toBe(0)
        done()
      }, 10)

    })


    it('can be called from a Component hook', () => {

      const div = (() => {
        function initState() { return {} }
        function connect() {}

        function render() {
          return h('div', {
            hook: {
              insert: vnode => {
                Render.into(vnode.elm, h('canvas'))
              }
            }
          })
        }

        return function() {
          return Component({ name: 'div', initState, connect, render })
        }
      })()

      startApp({ app: div(), elm: document.body, snabbdomModules: [] })

      const divEl = document.body.firstElementChild!.firstElementChild!

      expect(divEl.tagName).toBe('DIV')

      expect(divEl.firstElementChild!.tagName).toBe('CANVAS')
    })

  })

  describe('schedule DOM reads/writes', () => {

    it('will be executed after a vnode is rendered with Render.into', done => {

      const calls: string[] = []
      const node = h('div', { hook: { insert } }, h('span', { hook: { insert } }))

      function insert() {
        Render.scheduleDOMRead(() => {
          calls.push('domRead')
        })

        Render.scheduleDOMWrite(() => {
          calls.push('domWrite')
        })

        calls.push('insert')
      }

      Render.into(document.body, node)

      setTimeout(() => {
        expect(calls).toEqual([
          'insert', 'insert',
          'domRead', 'domRead',
          'domWrite', 'domWrite'
        ])

        done()
      }, 10)
    })
  })


})
