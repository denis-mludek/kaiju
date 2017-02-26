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
  * [Component lifecycle](#componentLifecycle)
  * [Local vs Global state](#localglobalstate)
  * [Stores](#stores)
* [API](#api)
  * [Creating a VNode with h](#api-h)
  * [Creating a component](#api-component)
  * [Altering the DOM from a component/VNode tree](#api-startApp)
    * [startApp](#api-startApp)
    * [Render.into](#api-renderInto)
    * [Render.scheduleDOMWrite](#api-renderSchedule)
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

We could also decide to just perform a side effect, instead of updating the component's state.  
When performing side effects (void/undefined is returned) the component is not redrawn:  

```ts

function connect({ on, msg }: ConnectParams<{}, State>) {
  const clicks = msg.listen(click).debounce(1000)

  on(clicks, _ => console.log('clicked!'))
}
```


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
* No notion of an observable's end/completion for simplicity sake and since we really have two kinds of observables: never ending ones (global state), and the ones that are tied to a particular component's lifecycle
* Lazy resource management: An observable only activates if there is at least one subscriber
* If the observable already holds a value, any subscribe function will be called immediately upon registration

To see observables in action, check the [example's ajax abstraction](https://github.com/AlexGalays/kaiju/tree/master/example/src/util/ajax.ts) and [its usage](https://github.com/AlexGalays/kaiju/tree/master/example/src/blue.ts#L58)


```ts
import { Observable } from 'kaiju/observable'

const obs = Observable.pure(100).map(x => x * 2).delay(200)
```

<a name="componentLifecycle"></a>
# Component lifecycle

## Creation
- 1) The component is now included in the application VNode tree for the first time
- 2) `initState()` is called with the initial props
- 3) `connect()` is called. Observables are plugged into the component, if they already hold state synchronously, the
component's initial state is updated immediately.
- 4) `render()` is called for the first time

Both `initState` and `connect` are called only once when the component first appears.

## Update
- At any point in time, the component will re-render if either is true:  
  - The parent rerenders the component with **changed** props (shallow comparison)
  - An Observable registered in `connect` is updated, and an **updated** state (shallow comparison) is returned in its handler.

Synchronously sending a message to the component in its `render` method is forbidden to avoid loops.

## Destruction
When some parent is removed from the tree or when the component's direct parent stops including the component in its render output, the component gets destroyed. `render` will never be called again and all the `Observables` are unregistered from.

Additionally, for any of these phases, the snabbdom [hooks](https://github.com/snabbdom/snabbdom#hooks) can be used on any VNode returned in `render`

## If I want to

**Initiate the component state from the initial props**

Return the init state in `initState`:  
```ts
function initState(props: Props) {
   return { enabled: props.isEnabledByDefault }
}
```

**Continuously compute a part of the component state from its props (e.g perf optimization)**

Derive some state from the props Observable in `connect`:  

```ts
function connect({ on, props }: ConnectParams<Props, State>) {
   on(props, (state, newProps) => ({ statePart: expensiveOperation(newProps) }))
}
```
There is no need to also derive the state in `initState`, since `props` is
an observable that always have an initial value (the handler will be called synchronously in `connect`).

**Recompute the component state if its props changed in a specific way**

This is a specialization of the above that avoid doing unnecessary work.
We just have to remember the last props and compare it with the new ones:  

```ts
function connect({ on, props }: ConnectParams<Props, State>) {
   on(props.sliding(2), (state, [newProps, oldProps]) => {
      if (!oldProps || newProps.expr !== oldProps.expr)
        return ({ expr: parseExpr(newProps) })
   })
}
```
Note however that for inexpensive computations, it is generally advised to simply do it in `render` as it's then easier to guarantee props, state and view are in sync.

**Perform a side effect when the component is added or removed**

Use a snabbdom hook.  
Note: refrain from sending a message in those hooks, it is generally a design smell.  

`create` is called before the element is added to the DOM,  
`insert` is called after the element is added the DOM,  
`remove` is called when the node's direct parent removes this node,  
`destroy` is called when this node is directly or indirectly being removed from the vnode tree.  

```ts
function render() {
   return (
     h('div', { hook: { create: enterAnimation, remove: exitAnimation } })
   )
}
```

**Alter the DOM when the component was rendered**

Use the `postpatch` snabbdom hook.  

```ts
function render() {
   return (
     h('div', { hook: { postpatch: fiddleWithTheDOMBehindYourBack } })
   )
}
```


**Clean up a setInterval or remove a DOM event listener when the component is removed**  
Good news everyone! You don't need to, if you use observables.  
Observables are automatically cleaned up when the component is removed.  

```ts
function connect({ on }: ConnectProps<Props, State>) {
  const polling = Observable.interval(2000)
  on(polling, state => {
    // This handler will not be called once the component is removed
    callSomeAjax()
  })

  on(Observable.fromEvent('click', document.body), (state, evt) => {
    // This handler will not be called once the component is removed (the event handler is removed)
  })
}
```

As an intellectual exercice, this is what happens under the hood:   

```ts
import Observable from 'kaiju/observable'

function connect({ on }: ConnectProps<Props, State>) {
  const observeDestruction = Observable(_ => () => {
    /* This is the cleanup function that is called when there are no longer any subscribers  
       to the observable. It will be  called when the component gets removed,  
       provided the component was the sole subscriber */
  })
  on(observeDestruction, () => {})
}
```

**Store some info in the current component for later use**  
e.g  
**Instantiate/destroy a vanillaJS widget when the component is added/removed**  

We can send a message from a DOM hook.  

Assuming we found some vanillaJS widget named `widget.Map` that has a `create` and `destroy` method:  
```ts

const inserted = Message<Element>('inserted')
const destroyed = Message('destroyed')

function connect({ on }: RenderParams<Props, State> & { context: Context }) {
  let mapWidget: MapWidget | undefined

  on(inserted, (state, elm) => { mapWidget = widget.Map.create(elm) })

  on(destroyed, () => mapWidget.destroy())
}

function render({ props, state, msg }: RenderParams<Props, State> & { context: Context }) {
  return (
    h('div', { hook: {
      insert: node => msg.send(inserted(node.elm)),
      destroy: () => msg.send(destroyed())
    }})
  )
}
```
Note that this kind of Message sent from a DOM lifecycle hook should always perform side effect only.  
If the state is updated, a warning will be logged and the component will ignore that change.  


<a name="localglobalstate"></a>
## Local state vs Global state

Choosing whether a particular state is local or global, whether it's very local (component leaf) or not so local
(owned by a component somewhere else in the tree) is an important decision, although it can easily be refactored
based on new needs.

You typically want to keep very transient state as local as possible so that it remains encapsulated in a component and do not leak up. Less stateful components are more flexible because their parents can do what they want with that
component, but stateful components are more productive and less error prone, as you can skip having boilerplate to wire the same
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

If you need a piece of state to live outside a component (it's not tied to a particular component's lifecycle), or you want your components to only care about presentational logic, you can either use Observables or Stores.
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
const anotherMessage = Message<[Event, {x: number}]>('anotherMessage')

h('div', { events: { click: anotherMessage.with({ x: 3 }) } })
```


<a name="api-component"></a>
## Creating a component

The `Component` factory function takes an object with the following properties:  

### name

Mandatory `String`  
This is the standard Virtual DOM `key` used in the diffing algorithm to uniquely identify this `VNode`.
It is also used for logging purposes, so it is usually just the name of the component.

### sel
Optional `String`  
An alternative hyperscript selector to use instead of `component`.  
Example:  
```ts
Component<Props, State>({ sel: `div.${styles.div}` })
```

### props

Optional `Object`  
An object representing all the properties passed by our parent.
Typically props either represents state that is maintained outside the component or properties used to tweak the component's behavior.  
The `render` function will be called if the props object changed shallowly (any of its property references changed), hence it's a good practice to try and use a flat object.
Note 1: props and state are separated exactly like in `React` as it works great. The same design best practices apply.
Note 2: If you wish to compute some state or generally perform a side effect based on whether some part of the props changed (similar to using `componentWillReceiveProps` in react) you can use the sliding2 combinator to compare the previous props with the ones:  

```ts
import { Observable } from 'kaiju/observable'

on(props.sliding2(), (state, [newProps, oldProps]) => ...)
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
 * Sends a message to self.
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

Mandatory `function({ props, state, msg }: RenderParams<Props, State>): VNode | Node[]`  

Returns the current VNode tree of the component based on its props and state.  
You can also return an Array of `Node`s, where a `Node` is either a `VNode` or a `string`.  

Example:  

```ts
import { h, Message, RenderParams } from 'kaiju'

interface State {
  text: string
}

const buttonClick = Message<[Event, number]>('buttonClick')

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

<a name="api-renderInto"></a>
## Render.into

This function is made available after the app was created with `startApp`.
This can be used to create some advanced components with their own internal rendering needs (e.g: Efficient popups, alerts, etc).
It renders either synchronously if called from an ongoing rendering phase, or asynchronously.

```ts
import { Render, h } from 'kaiju'

const firstVDom = h('div')

// Creates a new div as a child of body
Render.into(document.body, firstVDom)

// Patch that div so that it becomes a span
const cancel = Render.into(firstVDom, h('span'), () => {
  // Inside the rendered callback  
})
```


<a name="api-renderSchedule"></a>
## Render.scheduleDOMWrite

The virtual DOM abstraction pretty much guarantees an optimal way of creating and updating the DOM in a single pass, without any layout trashing.  
Sometimes, however, you may want to further alter the DOM in an imperative way when it's not possible to have a straightforward state->view binding.  
Kaiju provides two functions to do that without causing layout trashing:  
`Render.scheduleDOMRead` and `Render.scheduleDOMWrite`.  
Both are called at the end of a render cycle (so still inside a requestAnimationFrame context)  
The reads and writes are batched, reads are called first.  

```ts
import { Render, VNode } from 'kaiju'

// Called within an insert hook
function increaseHeight(vnode: VNode) {
  const el = vnode.elm as HTMLElement

  Render.scheduleDOMRead(() => {
    const height = el.clientHeight

    Render.scheduleDOMWrite(() => {
      el.style['height'] = `${height + 10}px`
    })
  })
}

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

### Catching unhandled messages

This can be done inside a Store or a component's connect function.  
For instance, inside a utility component, we could forward any messages we're not interested in to our parent:

```ts

function connect({ on, msg, props }: ConnectParams<Props, State>) {

  on(click, (state, evt) => update(state, { text: 'clicked!' }))

  on(Message.unhandled, (state, message) => msg.sendToParent(message))

}
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

Note: The render durations are more interesting as a relative measurement to spot bottlenecks and focus any optimization effort.  
The absolute durations may be heavily influenced by the `console` sometimes being very slow.  

![slow-console](http://i171.photobucket.com/albums/u320/boubiyeah/console.log.cost_zps4n1pvodl.png)
