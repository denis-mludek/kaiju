
import * as React from 'react'
import * as ReactDOM from 'react-dom'


const initialItems = (Array.apply(null, { length: 100 }) as Array<undefined>).map((_, index) => index)


interface Props {
  initialItems: number[]
}

interface State {
  items: number[]
}

class List extends React.Component<Props, State> {

  componentWillMount() {
    this.state = { items: this.props.initialItems }
  }

  render() {
    const itemEls = this.state.items.map(item => (
      <li key={ item }>
        <span>{ item }</span>
        <input value="bla" />
        <button onClick={ () => this.onDeleteRow(item) }>✕</button>
      </li>
    ))

    return <ul>{ itemEls }</ul>
  }

  onDeleteRow = (row: number) => {
    this.setState({ items: this.state.items.filter(r => r !== row) })
  }

}


const app = (
  <div>
    <h1>hello</h1>
    <p>My name is benchmark</p>
    <List initialItems={ initialItems } />
  </div>
)

const beforeRender = performance.now()

console.log('loading time', beforeRender)

ReactDOM.render(app, document.querySelector('main'))

console.log('render time', performance.now() - beforeRender)
