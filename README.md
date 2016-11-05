# Kaiju

![logo](https://s-media-cache-ak0.pinimg.com/236x/b4/c5/20/b4c5200e59fceaf6a5a92c11a77db95f.jpg)

kaiju is a view layer used to build an efficient tree of stateless/stateful components and help you manage that tree data.  


- Data management (local/global/inter-component/intra-component) is unified
- Fast, thanks to [snabbdom](https://github.com/paldepind/snabbdom), aggressive component rendering isolation (a key stroke in one input component should not re-evaluate the whole app) and async RAF rendering
- Changes can easily be animated (also thanks to snabbdom)
- Global and local state can optionally use Observables for greater composition
- No JS `class` / `this` nonsense
- Tiny size in KB
- Comes with useful logs
- First class support for typescript with a particular attention paid to type safety

# Content
* [Concepts](#componentization)
  * [Components: step by step guide](#componentization)
  * [Observables](#observables)
  * [Local vs Global state](#localglobalstate)
  * [Stores](#stores)
* [API](#api)
  * [Creating a VNode with h](#api-h)
  * [Creating a component](#api-component)
  * [Altering the DOM from a component/VNode tree](#api-startApp)
    * [startApp](#api-startApp)
    * [patch](#api-patch)
  * [Message: Intra and inter component communication](#api-message)
  * [Logging data changes and render timing](#api-logging)
* [Full TS Example](https://github.com/AlexGalays/kaiju/tree/master/example/src)

<a name="componentization"></a>
# Components: step by step guide

`kaiju` adds the concept of encapsulated components to `snabbdom`'s pure functional virtual dom.  
Standard Virtual nodes and components are composed to build a `VNode` tree that can scale in size and complexity.
A `VNode` is what you get when calling `snabbdom`'s `h` function for instance.

A component is simply a function that takes an option object as an argument and returns a `VNode` ready to be used inside its parent children, i.e, this is a valid array of `VNodes`:  

```ts
[
  h('div'),
  myComponent({ someProp: 33 }),
  h('p', 'hello')
]
```

Note: typescript will be used in the examples, however the library also works just fine with javascript.

0) We start with a stateless "component"

```ts
function button() {
  return h('button')
}
```

1) For comparison sake, here is the simplest stateful component definition one can write:  

```ts
import { Component, h } from 'kaiju'

export default function button() {
  return Component({ name: 'button', initState, connect, render })
}

function initState() { return {} }

function connect() {}

function render() {
  return h('button')
}
```

Now, that isn't terribly useful because we really want our component to be stateful, else we would just use a regular `VNode` object.

2) Let's add some state, and make it change over time:  


```ts
import { Component, h, Message, ConnectParams, RenderParams } from 'kaiju'


export default function() {
  return Component<void, State>({ name: 'button', initState, connect, render })
}

interface State {
  text: string
}

function initState() {
  return { text: '' }
}


const click = Message('click')


function connect({ on }: ConnectParams<{}, State>) {
  on(click, state => ({ text: 'clicked' }))
}


function render({ state }: RenderParams<void, State>) {
  return h('button', { events: { click } }, state.text)
}
```

Now we created a `Message` named click that is locally sent to our component whenever the user clicks on the button.  
We handle that message in `connect` and return the new state of our component. The component will then redraw with that new state.  

Using explicit Messages instead of callbacks to update our state brings consistency with other kinds of (external) state management and makes state debugging easier since messages can be traced and logged (see [logging](#api-logging)).  


In the above code, `on(click)` is in fact a shortcut for `on(msg.listen(click))`.

Here's the longer form:
```ts
function connect({ on, msg }: ConnectParams<{}, State>) {
  on(msg.listen(click), state => ({ text: 'clicked' }))
}
```

What `msg.listen(click)` returns is an [Observable](#observables) that emits new values (the payload of each message)
every time the message is sent.  
This is very useful because observables can easily be composed:  

```ts

function connect({ on, msg }: ConnectParams<{}, State>) {
  const clicks = msg.listen(click).debounce(1000)

  on(clicks, state => ({ text: 'clicked' }))
}
```

Now, the state is only updated if we stopped clicking for 1 second.


Our component now has an internal state and we know how to update it. But it's also completely opaque from the outside!  
In a tree of `VNodes`, parents must often be able to influence the rendering of their children.

3) For that purpose, we introduce props:

```ts
import { Component, h, Message, ConnectParams, RenderParams } from 'kaiju'


export default function(props: Props) {
  return Component<Props, State>({ name: 'button', props, initState, connect, render })
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


const click = Message('click')


function connect({ on }: ConnectParams<Props, State>) {
  on(click, state => ({ text: 'clicked' }))
}


function render({ props, state }: RenderParams<Props, State>) {
  return (
    h('div', [
      h('button', { events: { click } }, state.text),
      h('p', props.paragraph)
    ])
  )
}
```

Now our parent can render the component with more control: It can set the default text that should be displayed initially, but also
directly sets the paragraph text of the `p` tag.  

When composing components, you must choose which component should own which piece of state. Disregarding global state for now, local state can reside in a component or any of its parent hierarchy.


4) Let's see how we can move the previous button `text` state one level up, so that the component parent can directly change that state:  


```ts
import { Component, h, Message, ConnectParams, RenderParams } from 'kaiju'


export default function(props: Props) {
  return Component<Props, void>({ name: 'button', props, initState, connect, render })
}

interface Props {
  text: string
  paragraph: string
  onClick: Message<Event>
}


function initState() {
  return {}
}


const click = Message('click')


function connect({ on, props, msg }: ConnectParams<Props, State>) {
  on(click, (_, event) => msg.sendToParent(props().onClick(event)))
}


function render({ props, state }: RenderParams<Props, void>) {
  return (
    h('div', [
      h('button', { events: { click } }, props.text),
      h('p', props.paragraph)
    ])
  )
}

```

We now delegate and send a message to our direct parent component so that it can, in turn, listen to that message from its `connect` function and update its own state.
Note: The child component could send the same Message to its parent (delegation) but we choose to go with a `onClick` property to increase semantics, cohesion and typesafety.

At this point, the component is no longer stateful and providing it didn't have any other state, should be refactored back to a simple function returning a `VNode`:

```ts

interface Props {
  text: string
  paragraph: string
  onClick: Message<Event>
}

function button(props: Props) {
  const { text, paragraph, onClick } = props

  return (
    h('div', [
      h('button', { events: { click: onClick } }, text),
      h('p', paragraph)
    ])
  )
}
```

<a name="observables"></a>
# Observables

`kaiju` comes with an implementation of observables (also known as streams) so that components can more easily declare
how their state should change based on user input and any other observable changes in the application.  

Observables are completely optional: If you are more confident with just sending messages around every time the state should update, you can do that too.

The characteristics of this observable implementation are:

* Tiny abstraction, fast
* Has a functional style: all combinators are standalone functions that won't be compiled in your code if you don't import them
* Also has an OO style, optionally
* Multicast: All observables are aware that multiple subscribers may be present
* The last value of an observable can be read by invoking the observable as a function
* Synchronous: Easier to reason about and friendlier stack traces
* No error handling/swallowing: No need for it since this observable implementation is synchronous
* No notion of an observable's end/completion for simplicity sake and since we really only have two kinds of observables: never ending ones (global state), and the ones that are tied to a particular component's lifecycle
* Lazy resource management: An observable only activates if there is at least one subscriber
* If the observable already holds a value, any subscribe function will be called immediately upon registration


All combinators can be found under `lib/observable`, for instance to import `debounce`:

```ts
import debounce from 'kaiju/observable/debounce'
```

To see observables in action, check the [example's ajax abstraction](https://github.com/AlexGalays/kaiju/tree/master/example/src/util/ajax.ts) and [its usage](https://github.com/AlexGalays/kaiju/tree/master/example/src/blue.ts#L58)


## OO style

Importing `kaiju/observable` at least once in your codebase has the benefice of adding all the operators to the Observable object and instances for more convenience:  

```ts
import { Observable } from 'kaiju/observable'

const obs = Observable.pure(100).map(x => x * 2).delay(200)
```

<a name="localglobalstate"></a>
## Local state vs Global state

Choosing whether a particular state is local or global, whether it's very local (component leaf) or not so local
(owned by a component somewhere else in the tree) is an important decision, although it can easily be refactored
based on new needs.

You typically want to keep very transient state as local as possible so that it remains encapsulated in a component and do not leak up. Less stateful components are more flexible because their parents can do what they want with that
component, but more stateful components are more productive, as you can skip having boilerplate to wire the same
parent state => component props everywhere it's used.  

<br />
**Example of typically local state**
* Whether a select dropdown is opened
* Whether the component is focused
* Which grid row is highlighted
* Basically any state that resets if the user navigates away then comes back

Additionally, keeping state that is only useful to one screen should be kept inside the top-most component of that screen and no higher. Else, you would have to manually clean up that state when exiting the component.  

That just leaves global state, which can be updated from anywhere and is accessed from multiple screens.  
<br />
**Example of typically global state**
* The current url route
* User preferences
* Any cached, raw domain data that will be mapped/filtered/transformed in the different screens


<a name="stores"></a>
## Stores

A construct is provided to easily build push-based observables in a type-safe manner. This is entirely optional.  

If you need a piece of state to live outside a component (it's not tied to a particular component's lifecycle), you can either use Observables or Stores.
The difference is that a Store's state can be updated from the outside via `Messages` and is garanteed to have an initial value whereas an Observable can only be transformed via operators.   

Example:  
```ts

import { Message } from 'kaiju'
import Store from 'kaiju/store'
import merge from './util/obj/merge' // Fictitious


export const setUserName = Message<string>('setUserName')


interface UserState {
  name: string
}

const initialState = { name: 'bob' }

// This exports a store containing an observable ready to be used in a component's connect function
export default Store<UserState>(initialState, on => {
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
    // Copies the global user name into our local component state to make it available to `render`
    return merge(state, { userName: user.name })
  })
}

// ...
// Then anywhere else, import the store and the message
userStore.send(setUserName('Monique'))
```


<a name="api"></a>
# API


<a name="api-h"></a>
## Creating a VNode with h

Creates a `VNode`  
This is proxied to [snabbdom's h](https://github.com/paldepind/snabbdom/blob/master/h.js) so we can add our type definitions transparently.

```ts
import { h } from 'kaiju'
h('div', 'hello')
```
On top of the `snabbdom` modules you may feed to `startApp`, an extra module is always installed by `kaiju`: `events`.  
`events` is like `snabbdom`'s own `on` module except it works with `Messages` instead of just any event handler.  

```ts

import { Message } from 'kaiju'

const someMessage = Message<Event>('someMessage')

// Send a message to the enclosing component on click and on mousedown
h('div', { events: { click: someMessage, mousedown: someMessage } })

// Or prepare the message to be sent with an argument.
// This is more efficient than creating a closure on every render.
const anotherMessage = Message<{x: number}>('anotherMessage')

h('div', { events: { click: anotherMessage.with({ x: 3 }) } })
```


<a name="api-component"></a>
## Creating a component

The `Component` factory function takes an object with the following properties:  

### name

Mandatory `String`  
This is the standard Virtual DOM `key` used in the diffing algorithm to uniquely identify this `VNode`.
It is also used for logging purposes, so it is usually just the name of the component.

### props

Optional `Object`  
An object representing all the properties passed by our parent.
Typically props either represents state that is maintained outside the component or properties used to tweak the component's behavior.  
The `render` function will be called if the props object changed shallowly (any of its property references changed), hence it's a good practice to try and use a flat object.
Note 1: props and state are separated exactly like in `React` as it works great. The same design best practices apply.
Note 2: If you wish to compute some state or generally perform a side effect based on whether some part of the props changed (similar to using `componentWillReceiveProps` in react) you can use the sliding2 combinator to compare the previous props with the ones:  

```ts
import { sliding2 } from 'kaiju/observable/sliding'

on(sliding2(props), (state, [newProps, oldProps]) => ...)
```

### initState

Mandatory `Object`  
A function taking the initial props as an argument and returning the starting state.  
Note: Any synchronous observables further modifying the state in `connect` will effectively change the state used for the first render.

### connect

Mandatory `function({ on, msg, props }: ConnectParams<Props, State>): void`  
Connects the component to the app and computes the local state of the component.  
`connect` is called only once when the component is mounted.  

`connect` is called with three arguments, encapsulated in a `ConnectParams` object:  

- `on` registers a `Message` or `Observable` that modifies the component local state.  
The Observable will be automatically unsubscribed from when the component is unmounted.  
Returning the current state or `undefined` in an `on` handler will skip rendering and can be used to do side effects.  

Full interface:

```ts
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

- `msg` is the interface used to send and listen to messages.

Full interface:

```ts
/**
 * Listens for a message sent from local VNodes or component children
 */
listen<P>(message: Message<P>): Observable<P>

/**
 * Listens for messages bubbling up to a particular DOM node
 *
 * Example:
 * const clicks = msg.listenAt('#page .button', click)
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
It is often enough to simply let the `render` function take care of these new props but advanced users may sometimes want to derive some state from props.

Just like with props, a redraw will only get scheduled if the state object changed shallowly.


### render

Mandatory `function({ props, state, msg }: RenderParams<Props, State>): VNode`  

Returns the current VNode tree of the component based on its props and state.

Example:  

```ts
import { h, Message, RenderParams } from 'kaiju'

interface State {
  text: string
}

const buttonClick = Message<number>('buttonClick')

function render({ state }: RenderParams<void, State>) {
  const { text } = state

  return (
    h('div#text', [
      h('h1', 'Hello'),
      h('p', text),
      h('button', { events: { click: buttonClick.with(33) } })
    ])
  )
}
```

<a name="api-startApp"></a>
## startApp

Installs and performs the initial render of the app synchronously.

```ts
function startApp<S>(options: {
  app: VNode // The root VNode
  elm: HTMLElement // The root element where the app will be rendered
  snabbdomModules: any[] // The snabbdom modules that should be active during patching
}): void
```

```ts

import { startApp } from 'kaiju'
import app from './app'


const snabbdomModules = [
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/style')
]

startApp({ app, snabbdomModules, elm: document.body })

```

<a name="api-patch"></a>
## patch

The `snabbdom` [patch function](https://github.com/paldepind/snabbdom#patch) that kaiju uses. It is made available after the app was created with `startApp`.
This can be used to create some advanced components with their own internal patching needs (e.g: Efficient popups, alerts, etc).

```ts
import { patch } from 'kaiju'
```



<a name="api-message"></a>
## Message

Creates a custom application message used to either communicate between components or send to a [Store](#stores).  

```ts
import { Message } from 'kaiju'

// Message taking no arguments
const increment = Message('increment')

// Message taking one argument
const incrementBy = Message<number>('incrementBy')
```


<a name="api-logging"></a>
## Logging data changes and render timing

`kaiju` has useful logging to help you debug or visualize the data flows.

![log-example](http://i171.photobucket.com/albums/u320/boubiyeah/Screen%20Shot%202016-07-03%20at%2009.57.40_zpsf3gllchm.png)

By default, nothing is logged, but that can be changed:

```ts
import { log } from 'kaiju'

log.render = true
log.message = true
```

Additionally, you can specify which component gets logged using the component's `name`:

```ts
log.render = 'select'
log.message = 'popup'
```

You will want to change the log values as early as possible in your program so that no logs are missed.
