# dompteuse

![© DC Comics](http://i171.photobucket.com/albums/u320/boubiyeah/Original_Catwoman_Design_zpsokgquwmu.jpg)

Fast Virtual DOM with Reactive updating.

- Fast thanks to [snabbdom](https://github.com/paldepind/snabbdom), [most](https://github.com/cujojs/most), component isolation and async RAF rendering
- Global and local states use streams for greater composition
- No JS `class` / `this` nonsense
- Tiny size in KB
- Comes with useful logs
- Very typesafe / typescript friendly

# Content
* [Componentization](#componentization)
* [Global streams](#globalStreams)
* [Api](#api)
* [Example](https://github.com/AlexGalays/dompteuse/tree/master/example/src)

<a name="componentization"></a>
# Componentization

`dompteuse` adds the concept of encapsulated components to pure functional virtual dom.  
Standard Virtual nodes and components are composed to build a Vnode tree that can scale in size and complexity.

A component is simply a function that takes an option object as an argument and returns a Vnode ready to be used inside its parent children.

Note: typescript will be used in the examples, javascript devs can simply ignore the types annotations.

```javascript
import { Component } from 'dompteuse'

export default function(props?: Props) {
  return Component({
    key: 'Select',
    props,
    defaultProps,
    initState,
    connect,
    render
  })
}
```

Let's look at the option object properties:  

## key

Mandatory `String`  
This is the standard Virtual node key used to uniquely identify this Vnode. It is also used for logging purposes, so it is usually just the name of the component.

## props

Optional `Object`  
An object representing all the properties passed by our parent.
Typically props either represent state that is maintained outside the component or properties used to tweak the component behavior.  
The `render` function will be called if the props object changed shallowly, hence it's a better practice to use a flat object.
Note: props and state are separated exactly like in `React` as it works great. The same best practices apply.

## defaultProps

Optional `Object` (upper type of props)  
An object with some keys of the props that should be used if the parent do not specify all the props.

## initState

Mandatory `Object`  
A function taking the initial props as an argument and returning the starting state.  

## connect

Mandatory `function(on: StreamSub<State>, dom: DomEvents): void`  
Connects the component to the rest of the app and computes the local state of the component.  
`connect` is called only once when the component is mounted.  

`connect` is called with two arguments:  
`on` registers a Stream that modifies the component local state.  
`dom` is the interface used to listen to bubbling events or emit custom events.

`connect` arguably has more interesting characteristics than the imperative approach `React` use (i.e `setState`):  

- Streams are composable, callbacks are not. Doing things like throttling or only listening to the very last ajax action fired
is a recurrent, non abstractable pain with imperative code.  

- Separation of the markup and the component hierarchy wiring logic.  
render functions in react can get pretty messy, having to
pass callbacks several level down. What's more, callback references often change over time (most likely from using partial application) and we can no longer apply streamlined performance optimizations because some props truly represent data while other props are callbacks that may or may not purposedly change.  
Designers may also feel more at ease with working with a clean tree of Vnodes without having to think about the app logic.

Example:  

```javascript
import { StreamSub, DomEvents, Event } from 'dompteuse'

// A custom, type-safe event used to communicate with our parent hierarchy
export const Opened = Event('opened')

function connect(on: StreamSub<State>, dom: DomEvents) {
  // Subscribe to the stream of button clicks and update our state every time it changes
  on(dom.events('button', 'click'), state => {
    const opened = !state.opened

    // dispatch a custom event conditionaly.
    // Any parent component can listen to it using  dom.events('css selector', Opened)
    if (opened) dom.emit(Opened())

    // Any 'on' handler must return the new component state
    return merge(state, { opened })
  })
}
```

`connect` can listen to any kind of `most` stream, not just the provided dom event stream. See [global streams](#globalStreams).  
Just like with props, a redraw will only get scheduled if the state object changed shallowly so returning the current state
in `on()` will skip rerendering.  

## render

Mandatory `function(props: Props, state: State): VNode`  

Returns the Vnode tree based on the props and state.

Example:  

```javascript
import { h } from 'dompteuse'

interface State {
  text: string
}

function render(props: void, state: State) {
  const { text } = state

  return h('div#text', [
    h('h1', 'Hello'),
    h('p', text)
  ])
}
```

<a name="globalStreams"></a>
# Global streams

A construct is provided to easily build push-based global streams in a typesafe fashion. This is entirely optional.    

You typically want to keep very transient state as local as possible so that it remains encapsulated in a component and do not leak up (ex: Whether a select dropdown is opened, a component has focus, which grid row is highlighted, basically any state that resets if the user navigate away then come back)

Additionally, keeping state that is only useful to one screen should be kept inside the top-most component of that screen and no higher.  

That leaves global state, which can be updated from anywhere and is read from multiple screens such as:    
* The current route
* User preferences
* Any raw domain data that will be mapped/filtered/transformed in the different screens.  

The subscription to this global stream is automatically released when the component is unmounted.  

Example:  
```javascript

import { Action, ActionStream } from 'dompteuse'
import merge from './util/obj/merge'


export const setUserName = Action('setUserName')

interface UserState {
  name: string
}

const initialState = { name: 'bob' }

// This exports a stream ready to be used in a component's connect function
export default ActionStream<UserState>(initialState, on => {
  on(setUserName, (state, name) =>
    merge(state, { name })
  )
})

// ...
// Subscribe to it in a component's connect
import userState from './userState'

// Provide an initial value
function initialState() {
  return {
    userName: userState.value.name
  }
}

connect(on: StreamSub<State>, dom: DomEvents) {
  on(userState, (state, user) => {
    // 'Copy' the global user name into our local component state to make it available to `render`
    return merge(state, { userName: user.name })
  })
}

// ...
// Then anywhere else, import setUserName and use it
setUserName('Monique')
```

<a name="api"></a>
# Api

## h

Creates a Vnode  
This is proxied to [snabbdom's h](https://github.com/paldepind/snabbdom/blob/master/h.js) so we can add our type definitions
transparently.

```javascript
import { h } from 'dompteuse'
h('div', 'hello')
```

## startApp

Performs the initial render of the app synchronously.

```javascript
function startApp<S>(options: {
  app: Vnode // The root Vnode
  elm: HTMLElement // The root element where the app will be rendered
  patch: PatchFunction // The snabbdom patch function to be used during renders
}): void;
```

```javascript

import { snabbdom, startApp } from 'dompteuse'
import app from './app'

declare var require: any
const patch = snabbdom.init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/style')
])

startApp({ app, patch, elm: document.body })

```
## Event

Create a custom application event used to communicate between components.  
This effectively replace callbacks passed from parent to children in React.   

```javascript
import { Event } from 'dompteuse'

// Event taking no arguments
const increment = Event('increment')

// Event taking one argument
const incrementBy = Event<number>('incrementBy')
```

## StreamSub

The registration function passed to `connect` used to subscribe to a stream and update the component state.  

Signature:  

```javascript
on(stream: Stream<A>, handler: (state: State, payload: A) => State)
```

## DomEvents

The api object passed to `connect` and used to communicate via events propagating through the DOM.  

Detail:  

```javascript
dom.events(selector: string, eventName: string): Stream<Event>
dom.events<P>(selector: string, customEvent: CustomEvent<P>): Stream<P>
dom.emit<P>(event: EventPayload<P>): void
```

Example:  
```javascript
import { StreamSub, DomEvents, Event } from 'dompteuse'
import { Opened } from './someComponent'

const Increment = Event('increment')

connect(on: StreamSub<State>, dom: DomEvents) {

  // Regular DOM events
  const clickStream = dom.events('button', 'click')

  // Custom Events
  const openStream = dom.events('.someComponent', Opened)

  // Emit a bubbling custom Event. Any parent component can listen to it.
  dom.emit(Increment())
}
```
