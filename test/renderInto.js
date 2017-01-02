require('jsdom-global')()
global.requestAnimationFrame = fn => setTimeout(fn, 1)

import expect from 'expect'
import { renderInto, h } from '../src/main'


describe('renderInto', () => {


  afterEach(() => {
    document.body.innerHTML = ''
  })


  it('can render a VNode into an element', done => {

    const vnode = h('span#daSpan')

    // Creation
    renderInto(document.body, vnode, () => {
      const span = document.body.firstChild

      expect(span.tagName).toBe('SPAN')
      expect(span.id).toBe('daSpan')

      // Update
      renderInto(vnode, h('span#daSpan', 'hello'), () => {
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
      h('div'),
      'some text'
    ]

    // Creation
    renderInto(document.body, init, () => {
      const [span, div, text] = document.body.childNodes

      expect(span.tagName).toBe('SPAN')
      expect(div.tagName).toBe('DIV')
      expect(text).toExist()
      expect(text.textContent).toBe('some text')

      const updated = [
        h('span'),
        h('input'),
        'some text (2)'
      ]

      // Update 1: Swap the middle element
      renderInto(init, updated, () => {
        const [updatedSpan, input, updatedText] = document.body.childNodes

        expect(updatedSpan).toBe(span)
        expect(input.tagName).toBe('INPUT')
        expect(updatedText).toBe(text)
        expect(updatedText.textContent).toBe('some text (2)')

        const emptyNodes = []

        // Update 2: Empty array
        renderInto(updated, emptyNodes, () => {
          expect(document.body.children.length).toBe(0)

          // Update 3: Go back to the second VNode structure
          renderInto(emptyNodes, updated, () => {
            expect(document.body.childNodes.length).toBe(3)
            done()
          })
        })

      })
    })
  })


  it('can be cancelled', done => {

    const cancel = renderInto(document.body, h('span'))
    cancel()

    setTimeout(() => {
      expect(document.body.children.length).toBe(0)
      done()
    }, 10)

  })

})
