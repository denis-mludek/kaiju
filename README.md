# dompteuse

![© DC Comics](http://i171.photobucket.com/albums/u320/boubiyeah/Original_Catwoman_Design_zpsokgquwmu.jpg)

Fast Virtual DOM components with Reactive updating.

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

Note: typescript will be used in the examples, javascript devs can ignore the types annotations.

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
Typically props either represent state that is maintained outside the component or properties used to tweak the component's behavior.  
The `render` function will be called if the props object changed shallowly, hence it's a good practice to use a flat object.
Note: props and state are separated exactly like in `React` as it works great. The same design best practices apply.

## defaultProps

Optional `Object` (upper type of props)  
An object with part of the prop keys that should be used if the parent do not specify all the props.

## initState

Mandatory `Object`  
A function taking the initial props as an argument and returning the starting state.  

## connect

Mandatory `function({ on, messages, props }: ConnectParams<Props, State>): void`  
Connects the component to the app and computes the local state of the component.  
`connect` is called only once when the component is mounted.  

`connect` is called with three arguments, encapsulated in a `ConnectParams` object:  

- `on` registers a Stream that modifies the component local state. The stream will be automatically unsubscribed from when
the component is unmounted.
- `messages` is the interface used to `listen` to custom Messages sent by direct component children or `send` a message to our direct component parent. Streams created this way will also be unsubscribed from when the component is unmounted.  
- `props` A props accessor function. Used to read props inside connect.

`connect` arguably has more interesting characteristics than the imperative approach `React` use (i.e `setState`):  

- Streams are composable, callbacks are not. Doing things like throttling or only listening to the very last ajax action fired
is a recurrent, non abstractable pain with imperative callback/setState.  

- Callback references often change over time (most likely from using partial application) and we can no longer apply streamlined performance optimizations because some props truly represent data while other props are callbacks that may or may not purposely change. By using simple `Messages` instead of bound functions/closures, this issue is avoided.

Example:  

```javascript
import { Message, ConnectParams } from 'dompteuse'

// Message used to communicate with our children in a cohesive manner
const TriggerClick = Message('triggerClick')

function connect({ on, props, messages }: ConnectParams<Props, State>) {
  // Subscribe to the stream of button clicks and update our state every time it changes
  on(messages.listen(TriggerClick), state => {
    const opened = !state.opened

    // Any 'on' handler must return the new component state
    return merge(state, { opened })
  })
}
```

`on` can listen to any kind of `most` stream. See [global streams](#globalStreams).  
Just like with props, a redraw will only get scheduled if the state object changed shallowly so returning the current state
in `on()` will skip rendering.  

## render

Mandatory `function(props: Props, state: State): VNode`  

Returns the Vnode tree based on the props and state.

Example:  

```javascript
import { h, Message } from 'dompteuse'

interface State {
  text: string
}

const ButtonClick = Message('buttonClick')

function render(props: void, state: State) {
  const { text } = state

  return h('div#text', [
    h('h1', 'Hello'),
    h('p', text),
    h('button', { events: { onClick: ButtonClick } })
  ])
}
```

<a name="globalStreams"></a>
# Global streams

A construct is provided to easily build push-based global streams in a typesafe fashion. This is entirely optional.    

You typically want to keep very transient state as local as possible so that it remains encapsulated in a component and do not leak up.  
<br />
**Example of typical local state**
* Whether a select dropdown is opened
* The component has focus
* Which grid row is highlighted
* Basically any state that resets if the user navigate away then come back

Additionally, keeping state that is only useful to one screen should be kept inside the top-most component of that screen and no higher.  

That leaves global state, which can be updated from anywhere and is read from multiple screens.  
<br />
**Example of typical global state**
* The current route
* User preferences
* Any raw domain data that will be mapped/filtered/transformed in the different screens (if you're caching these)

Example:  
```javascript

import { Message, GlobalStream } from 'dompteuse'
import merge from './util/obj/merge'


export const setUserName = Message<string>('setUserName')

interface UserState {
  name: string
}

const initialState = { name: 'bob' }

// This exports a stream ready to be used in a component's connect function
export default GlobalStream<UserState>(initialState, on => {
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

connect(on: StreamSub<State>, events: Events) {
  on(userState, (state, user) => {
    // 'Copy' the global user name into our local component state to make it available to `render`
    return merge(state, { userName: user.name })
  })
}

// ...
// Then anywhere else, import the stream and the message
stream.send(setUserName('Monique'))
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
On top of the `snabbdom` modules you pass to `startApp`, an extra module is installed by `dompteuse`: `events`.  

```javascript

import { Message } from 'dompteuse'

const SomeMessage = Message<Event>('someMessage')

// Send a message to the enclosing component on click
h('div', { events: { onClick: SomeMessage } })

// Or prepare the message to be sent with an argument.
// This is more efficient than creating a closure on every render.
const AnotherMessage = Message<{x: number}>('anotherMessage')

h('div', { events: { onClick: AnotherMessage.with({ x: 3 }) } })
```

## startApp

Performs the initial render of the app synchronously.

```javascript
function startApp<S>(options: {
  app: Vnode // The root Vnode
  elm: HTMLElement // The root element where the app will be rendered
  snabbdomModules: any[] // The snabbdom modules that should be active during patching
}): void;
```

```javascript

import { startApp } from 'dompteuse'
import app from './app'

declare var require: any
const snabbdomModules = [
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/style')
]

startApp({ app, snabbdomModules, elm: document.body })

```
## Message

Create a custom application message used to either communicate between components or push to a [GlobalStream](#globalStreams).    
```javascript
import { Message } from 'dompteuse'

// Message taking no arguments
const increment = Message('increment')

// Message taking one argument
const incrementBy = Message<number>('incrementBy')
```

## ConnectParams

### StreamSub

Used to subscribe to a stream and update the component state.  
If nothing is returned (undefined) then the component state is not modified.  

Signature:  

```javascript
on<A>(stream: Stream<A>, cb: (state: S, value: A) => S|void): Stream<A>
on(message: NoArgMessage, cb: (state: S) => S|void): Stream<void>

// Shortcut for on(messages.listen(MyMessage))
on<P>(message: Message<P>, cb: (state: S, payload: P) => S|void): Stream<P>
```

### Messages

```javascript
// Listen for messages coming from immediate Vnodes or component children
messages.listen<P>(message: Message<P>): Stream<P>

// Listen for a Message at the first Element found using the given CSS selector.
// This should be rarely used, and is mostly useful for components
// that attach their content to a remote DOM Element, like popups.
messages.listenAt<P>(selector: string, message: Message<P>): Stream<P>;

// Sends a message to the nearest parent component
messages.send<P>(message: MessagePayload<P>): void
```

Example:  
```javascript
import { ConnectParams, Message } from 'dompteuse'
import { Opened } from './someComponent'

const Increment = Message('increment')

connect({ on, messages }: ConnectParams<Props, State>) {
  // Listen to the Opened even sent by 'someComponent'
  const openStream = messages.listen(Opened)

  // This is equivalent to above
  const openStream2 = on(Opened, state => state)

  // Send a message. Our direct parent can react to it.
  messages.send(Increment())
}
```

## Events

Builds a Stream of DOM Events using Event delegation.

```javascript
listenAt(node: Element, targetSelector: string, eventName: string): Stream<Event>
```

```javascript
import { Events } from 'dompteuse'

const stream = Events.listenAt(document.body, '.button', 'click')
```

## patch

The `snabbdom` patch function that dompteuse uses. Only available after the call to `startApp`  


```javascript
import { patch } from 'dompteuse'
```
