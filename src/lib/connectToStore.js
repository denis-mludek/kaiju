import h from 'snabbdom/h'
import Component from './component'
import { assign } from './util'


export default function connectToStore() {
  return function (baseComponent, mapStoreToProps) {

    function initState() {
      return {}
    }

    function connect({ on, props, state }) {
      const { store } = props()

      on(props, unfilteredExternalProps => {
        const externalProps = {}

        Object.keys(unfilteredExternalProps).forEach(key => {
          if (key !== 'store') externalProps[key] = unfilteredExternalProps[key]
        })

        return assign({}, state(), { externalProps })
      })

      on(store.state, storeState => {
        const mappedProps = mapStoreToProps(store)
        return assign({}, state(), { mappedProps })
      })

    }

    function render({ state }) {
      const props = assign({}, state.externalProps, state.mappedProps)
      return baseComponent(props)
    }

    return function connectComponent(props) {
      return Component({ name: 'connect', log: false, initState, props, connect, render })
    }

  }
}