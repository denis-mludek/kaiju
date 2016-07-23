# dompteuse

![© DC Comics](http://i171.photobucket.com/albums/u320/boubiyeah/Original_Catwoman_Design_zpsokgquwmu.jpg)

Fast Virtual DOM components with Reactive updating.

- Fast, thanks to [snabbdom](https://github.com/paldepind/snabbdom), aggressive component rendering isolation and async RAF rendering
- Global and local state can optionally use Observables for greater composition
- No JS `class` / `this` nonsense
- Tiny size in KB (slow-network-friendly, parsed quickly)
- Comes with useful logs
- First class support for typescript (very typesafe)


# Content
* [Components: step by step guide](#componentization)
* [Observables](#observables)
* [Global stores](#globalStores)
* [API](#api)
  * [Component](#api-component)
  * [h](#api-h)
  * [startApp](#api-startApp)
  * [Message](#api-message)
  * [patch](#api-patch)
  * [logging](#api-logging)
* [Full TS Example](https://github.com/AlexGalays/dompteuse/tree/master/example/src)

<a name="componentization"></a>
# Components: step by step guide

`dompteuse` adds the concept of encapsulated components to `snabbdom`'s pure functional virtual dom.  
Standard Virtual nodes and components are composed to build a `Vnode` tree that can scale in size and complexity.
A `Vnode` is what you get when calling `snabbdom`'s `h` function for instance.

A component is simply a function that takes an option object as an argument and returns a `Vnode` ready to be used inside its parent children, i.e, this is a valid array of `Vnodes`:  

```javascript
[
  h('div'),
  myComponent({ someProp: 33 }),
  h('p', 'hello')
]
```

Note: typescript will be used in the examples, however the library also works just fine with javascript.

1) Here is the simplest component definition one can write:  

```javascript
import { Component, h } from 'dompteuse'

export default function() {
  return Component({ name: 'button', initState, connect, render })
}

function initState() { return {} }

function connect() {}

function render() {
  return h('button')
}
```

Now, that isn't terribly useful because we really want our component to be stateful, else we would just use a regular `Vnode` object.

2) Let's add some state, and make it change over time:  


```javascript
import { Component, h, Message, ConnectParams } from 'dompteuse'
import { merge } from './util/object' // Fictitious


export default function() {
  return Component<{}, State>({ name: 'button', initState, connect, render })
}

interface State {
  text: string
}

function initState() {
  return { text: '' }
}


const Click = Message('Click')


function connect({ on }: ConnectParams<{}, State>) {
  on(Click, state => ({ text: 'clicked' }))
}


function render(props: {}, state: State) {
  return h('button', { events: { onClick: Click } }, state.text)
}
```

Now we created a `Message` named Click that is locally sent to our component whenever the user click on the button.  
We handle that message in `connect` and return the new state of our component. The component will then redraw with that new state.  

Using explicit Messages instead of callbacks to update our state brings consistency with other kinds of (external) state management and make state debugging easier since messages can be logged (see [logging](#api-logging)).  


In the above code, `on(Click)` is in fact a shortcut for `on(msg.listen(Click))`.

Here's the longer form:
```javascript
function connect({ on, msg }: ConnectParams<{}, State>) {
  on(msg.listen(Click), state => ({ text: 'clicked' }))
}
```

What `msg.listen(Click)` returns is an [Observable](#observables) that emits new values (the payload of each message)
every time the message is sent.  
This is very useful because observables can be composed easily:  

```javascript
import debounce from 'dompteuse/observable/debounce'

function connect({ on, msg }: ConnectParams<{}, State>) {
  const clicks = debounce(1000, msg.listen(Click))

  on(clicks, state => ({ text: 'clicked' }))
}
```

Now, the state is only updated if we stopped clicking for 1 second.


Our component now has an internal state and we know how to update it. But it's also completely opaque from the outside!  
In a tree of `Vnodes`, parents must be able to influence the rendering of their children.

3) For that purpose, we introduce props:

```javascript
import { Component, h, Message, ConnectParams } from 'dompteuse'
import { merge } from './util/object' // Fictitious


export default function(props: Props) {
  return Component<{}, State>({ name: 'button', props, initState, connect, render })
}

interface Props {
  defaultText: string
  paragraph: string
}

interface State {
  text: string
}

function initState(initProps: Props) {
  return { text: initProps.defaultText }
}


const Click = Message('Click')


function connect({ on }: ConnectParams<Props, State>) {
  on(Click, state => ({ text: 'clicked' }))
}


function render(props: Props, state: State) {
  return (
    h('div', [
      h('button', { events: { onClick: Click } }, state.text),
      h('p', props.paragraph)
    ])
  )
}
```

Now our parent can render the component with more control: It can set the default text that should be displayed initially, but also
directly set the paragraph text of the `p` tag.  

When composing components, you must choose which component should own which piece of state. Disregarding global state (which has a use, see [Global store](#globalStores)) for a second, local state can reside in a component or any of its parent hierarchy.


4) Let's see how we can move the previous button `text` state one level up, so that the component parent can directly set it:  


```javascript
import { Component, h, Message, ConnectParams } from 'dompteuse'
import { merge } from './util/object' // Fictitious


export default function(props: Props) {
  return Component<{}, State>({ name: 'button', props, initState, connect, render })
}

interface Props {
  text: string
  paragraph: string
  onClick: Message<Event>
}

interface State {}

function initState() {
  return {}
}


const Click = Message('Click')


function connect({ on, props, msg }: ConnectParams<Props, State>) {
  on(Click, (_, event) => msg.sendToParent(props().onClick(event)))
}


function render(props: Props, state: State) {
  return (
    h('div', [
      h('button', { events: { onClick: Click } }, props.text),
      h('p', props.paragraph)
    ])
  )
}

```

We now delegate and send a message to our direct parent component so that it can, in turn, listen to that message from its `connect` function and update its own state.

At this point, the component is no longer stateful and providing it didn't have any other state, should be refactored to a simple
function returning a `Vnode` or Array of `Vnodes`.


<a name="observables"></a>
# Observables

`dompteuse` comes with an implementation of observables (also known as streams) so that components can more easily declare
how their state should change based on user input and any other observable changes in the application.  

Observables are an optional abstraction: If you are more confident with just sending messages around, you can do that too.

The characteristics of this observable implementation are:

* Tiny abstraction, fast
* Has a functional style: all combinators are standalone functions that won't be compiled in your code if you don't import them
* Multicast: All observables are aware that multiple subscribers may be interested
* The last value of an observable can be read by invoking the observable as a function
* Synchronous: Easier to reason about and friendlier stack traces
* No error handling/swallowing: No need for it since this observable implementation is synchronous
* No notion of an observable's end/completion for simplicity sake and since we have just two kinds of observables: never ending ones, and ones that are tied to a component's lifecycle
* Lazy resource management: An observable only activate if there is at least one subscriber
* If the observable already hold a value, any subscribe function will be called immediately upon registration


All combinators can be found under `lib/observable`, for instance to import `debounce`:

```javascript
import debounce from 'dompteuse/observable/debounce'
```

To see observables in action, check the [example's ajax abstraction](https://github.com/AlexGalays/dompteuse/tree/master/example/src/util/ajax.ts) and [its usage](https://github.com/AlexGalays/dompteuse/tree/master/example/src/blue.ts#L58)

<a name="globalStores"></a>
## Global stores

A construct is provided to easily build push-based global observables in a type-safe manner. This is entirely optional.    

First, a note on local versus global state:  

You typically want to keep very transient state as local as possible so that it remains encapsulated in a component and do not leak up.  
<br />
**Example of typical local state**
* Whether a select dropdown is opened
* The component has focus
* Which grid row is highlighted
* Basically any state that resets if the user navigate away then come back

Additionally, keeping state that is only useful to one screen should be kept inside the top-most component of that screen and no higher.  

That leaves global state, which can be updated from anywhere and is accessed from multiple screens.  
<br />
**Example of typical global state**
* The current route
* User preferences
* Any raw domain data that will be mapped/filtered/transformed in the different screens (if you're caching these)

Example:  
```javascript

import { Message } from 'dompteuse'
import GlobalStore from 'dompteuse/store'
import merge from './util/obj/merge' // Fictitious


export const setUserName = Message<string>('setUserName')


interface UserState {
  name: string
}

const initialState = { name: 'bob' }

// This exports a store containing an observable ready to be used in a component's connect function
export default GlobalStore<UserState>(initialState, on => {
  on(setUserName, (state, name) =>
    merge(state, { name })
  )
})

// ...
// Subscribe to it in a component's connect
import userStore from './userStore'

// Provide an initial value
function initialState() {
  return {
    userName: userStore.state().name
  }
}

function connect({ on }: ConnectParams<{}, State>) {
  on(userStore.state, (state, user) => {
    // 'Copy' the global user name into our local component state to make it available to `render`
    return merge(state, { userName: user.name })
  })
}

// ...
// Then anywhere else, import the store and the message
userStore.send(setUserName('Monique'))
```


<a name="api"></a>
# API

<a name="api-component"></a>
## Component

The `Component` factory function takes an object with the following properties:  

### name

Mandatory `String`  
This is the standard Virtual DOM `key` used in the diffing algorithm to uniquely identify this `Vnode`.
It is also used for logging purposes, so it is usually just the name of the component.

### props

Optional `Object`  
An object representing all the properties passed by our parent.
Typically props either represent state that is maintained outside the component or properties used to tweak the component's behavior.  
The `render` function will be called if the props object changed shallowly (any of its property references changed), hence it's a good practice to use a flat object.
Note 1: props and state are separated exactly like in `React` as it works great. The same design best practices apply.
Note 2: If you wish to compute some state based on whether some part of the props changed (similar to using `componentWillReceiveProps` in react) you can use the sliding2 combinator:  

```javascript
import { sliding2 } from 'dompteuse/observable/sliding'

on(sliding2(props), (state, [newProps, oldProps]) => ...)
```

### initState

Mandatory `Object`  
A function taking the initial props as an argument and returning the starting state.  

### connect

Mandatory `function({ on, msg, props }: ConnectParams<Props, State>): void`  
Connects the component to the app and computes the local state of the component.  
`connect` is called only once when the component is mounted.  

`connect` is called with three arguments, encapsulated in a `ConnectParams` object:  

- `on` registers a `Message` or `Observable` that modifies the component local state.  
The Observable will be automatically unsubscribed from when the component is unmounted.  
Returning the current state or `undefined` in an `on` handler will skip rendering and can be used to do side effects.  

Full interface:

```javascript
/**
 * Registers an Observable<Value> and call the handler function every time the observable has a new value.
 * The handler is called with the current component state and the new value of the observable.
 * Returning undefined or the current state in the handler is a no-op.
 */
<T>(observable: Observable<T>, handler: (state: S, value: T) => S|void): void

/**
 * Registers a Message and call the handler function every time the message is sent.
 * The handler is called with the current component state.
 * Returning undefined or the current state in the handler is a no-op.
 */
(message: NoArgMessage, handler: (state: S) => S|void): void

/**
 * Registers a Message and call the handler function every time the message is sent.
 * The handler is called with the current component state and the payload of the message.
 * Returning undefined or the current state in the handler is a no-op.
 */
<P>(message: Message<P>, handler: (state: S, payload: P) => S|void): void
```

- `msg` is the interface used to send and listen messages.

Full interface:

```javascript
/**
 * Listens for a message sent from immediate Vnodes or component children
 */
listen<P>(message: Message<P>): Observable<P>

/**
 * Listens for messages bubbling up to a particular DOM node
 *
 * Example:
 * const clicks = msg.listenAt('#page .button', Click)
 */
listenAt<P>(selector: string, message: Message<P>): Observable<P>

/**
 * Sends a message to self. Note: Messages should not be sent synchronously from an on() handler.
 *
 * Example:
 * msg.send(AjaxSuccess([1, 2]))
 */
send<P>(payload: MessagePayload<P>): void

/**
 * Sends a message to this component's nearest parent.
 *
 * Example:
 * msg.sendToParent(ItemSelected(item))
 */
sendToParent<P>(payload: MessagePayload<P>): void
```

- `props` An Observable with a new value every time the props passed by our parent changed.

Just like with props, a redraw will only get scheduled if the state object changed shallowly.


### render

Mandatory `function(props: Props, state: State): Vnode`  

Returns the Vnode tree based on the props and state.

Example:  

```javascript
import { h, Message } from 'dompteuse'

interface State {
  text: string
}

const ButtonClick = Message<number>('ButtonClick')

function render(props: void, state: State) {
  const { text } = state

  return (
    h('div#text', [
      h('h1', 'Hello'),
      h('p', text),
      h('button', { events: { onClick: ButtonClick.with(33) } })
    ])
  )
}
```


<a name="api-h"></a>
## h

Creates a `Vnode`  
This is proxied to [snabbdom's h](https://github.com/paldepind/snabbdom/blob/master/h.js) so we can add our type definitions
transparently.

```javascript
import { h } from 'dompteuse'
h('div', 'hello')
```
On top of the `snabbdom` modules you may feed to `startApp`, an extra module is always installed by `dompteuse`: `events`.  

```javascript

import { Message } from 'dompteuse'

const SomeMessage = Message<Event>('SomeMessage')

// Send a message to the enclosing component on click
h('div', { events: { onClick: SomeMessage } })

// Or prepare the message to be sent with an argument.
// This is more efficient than creating a closure on every render.
const AnotherMessage = Message<{x: number}>('AnotherMessage')

h('div', { events: { onClick: AnotherMessage.with({ x: 3 }) } })
```

<a name="api-startApp"></a>
## startApp

Performs the initial render of the app synchronously.

```javascript
function startApp<S>(options: {
  app: Vnode // The root Vnode
  elm: HTMLElement // The root element where the app will be rendered
  snabbdomModules: any[] // The snabbdom modules that should be active during patching
}): void
```

```javascript

import { startApp } from 'dompteuse'
import app from './app'


const snabbdomModules = [
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/style')
]

startApp({ app, snabbdomModules, elm: document.body })

```
<a name="api-message"></a>
## Message

Create a custom application message used to either communicate between components or send to a [GlobalStore](#globalStores).  

```javascript
import { Message } from 'dompteuse'

// Message taking no arguments
const Increment = Message('Increment')

// Message taking one argument
const IncrementBy = Message<number>('IncrementBy')
```


<a name="api-patch"></a>
## patch

The `snabbdom` patch function that dompteuse uses. It is made available after the call to `startApp`.
This can be used to create some advanced components with their own internal patching needs.

```javascript
import { patch } from 'dompteuse'
```


<a name="api-logging"></a>
## logging

`dompteuse` has useful logging to help you debug or visualize the data flows.

![log-example](http://i171.photobucket.com/albums/u320/boubiyeah/Screen%20Shot%202016-07-03%20at%2009.57.40_zpsf3gllchm.png)

By default, nothing is logged, but that can be changed:

```javascript
import { log } from 'dompteuse'

log.render = true
log.message = true
```

Additionally, you can specify which component get logged using the component's `name`:

```javascript
log.render = 'select'
log.message = 'popup'
```

You will want to change the log values as early as possible in your program so that no logs are missed.
