require('jsdom-global')()
import expect from 'expect'
import { Component, h, patch, startApp } from '../src/main'


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


describe('Component', () => {

  it('is a regular VDOM node', () => {

    expect(button().sel).toBe('component')

    startApp({ app: button(), elm: document.body, snabbdomModules })

    expect(document.body.children[0].tagName).toBe('COMPONENT')
    expect(document.body.children[0].children[0].tagName).toBe('BUTTON')
  })

})
