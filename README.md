# dompteuse

# **NOTE: This an archive branch of the first flux-based approach to modelize local state **

![© DC Comics](http://i171.photobucket.com/albums/u320/boubiyeah/Original_Catwoman_Design_zpsokgquwmu.jpg)

Fast Virtual DOM with Reactive updating.

- Fast (thanks to [snabbdom](https://github.com/paldepind/snabbdom), subtree redraw optimizations and RAF)
- Has the same programming model for global app state and components' local state
- Flux-like data flow. Gentle learning curve, faster and more flexible compared to most approaches based on streams.
- No JS `class` / `this` nonsense
- Tiny size in KB
- Comes with useful logs
- Very typescript friendly (Check the [example](https://github.com/AlexGalays/dompteuse/tree/master/example/src))

# Content
* [Componentization](#componentization)
* [Api](#api)

<a name="componentization"></a>
# Componentization

`dompteuse` brings the concept of encapsulated components to pure functional virtual dom.  

At a high level, these are the different kinds of components and nodes you may compose in a typical application:  

## Virtual nodes
Most of your application will still be made up of plain old virtual dom nodes without any internal state.
```javascript
import { h } from 'dompteuse';

function button(props) {
  return h('button', props);
}
```

## Stateless component
Pulls state from the global store then pass props derived from that state to its children.  
These components are optimized as they only redraw if the pulled state changed.  
It also remove the cumbersome act of passing props several layer down, so it's easier to maintain/refactor.  
Typically, you use stateless components at every url route / sub-route pivot or as an optimization
for deeply nested components that need a piece of data its parents don't care about.  
On the other hand, pulling state from the global store is not suitable for reusable components.

```javascript
import { component, h } from 'dompteuse';

export default function() {
  return component({
    key: 'users',
    pullState,
    render
  });
};

function pullState(state) {
  return { users: state.users };
}

function render({ users }) {
  return h('ul', users.map(user => h('li', user.name)));
}

```

## Stateful components
Maintains a state locally by using a transient fluxx store. While keeping state in the global store is nice
to synchronize multiple components together, keeping everything in the global store is a maintenance hazard and leads
to a lot of code repetition. Relying on global state a lot also means you have to clean up the state when navigating inside the app, for instance when a temporary form did start to push his data into the global state, then gets cancelled and need to be later reopened with a blank slate.  
You typically want to keep very transient state as local as possible so that it remains encapsulated and do not leak up (ex: Whether a select dropdown is opened, a component has focus, which grid row is highlighted, basically any state that resets if the user navigate away then come back)

```javascript
import update from 'immupdate';
import { component, h } from 'dompteuse';
import { LocalStore, Action } from 'fluxx';

export default function(props) {
  return component({
    key: 'select',
    localStore,
    props,
    render
  });
};

function localStore(props) {
  const initialState = { opened: props.openedByDefault };

  const actions = {
    toggle: Action('toggle')
  };

  const store = LocalStore(initialState, on => {
    on(actions.toggle, state => update(state, { opened: !state.opened }))
  });

  return { store, actions };
}

function render({ props, localState, actions }) {
  const { opened } = localState;
  return h('div.select', { class: { opened }, on: { click: actions.toggle } });
}

```

Components can also be stateful AND pull state from the global store. Ex: The global store maintains
a cached list of all users, while the local store knows which filter is currently active for this particular screen.

<a name="api"></a>
# Api

## startApp

Wires and perform the first render of the app.  
Imported with:  `import { startApp } from 'dompteuse';`

```javascript
function startApp<S>(options: {
  app: Vnode; // The root Vnode
  store: GlobalStore<S>; // The global fluxx store for this application
  elm: HTMLElement; // The root element where the app will be rendered
}): void;
```

## Component

Returns a new Vnode with a Component lifecycle.  
Imported with: `import { component } from 'dompteuse';`

```javascript
export function component<P extends DP, DP, PS, LS, AS>(options: {
  key: string; // The snabbdom key unique to this element
  props?: P; // Props passed by the component's parent
  defaultProps?: DP; // Default props
  localStore?: (props: P) => { store: LocalStore<LS>, actions: AS }; // The stateful component's fluxx Store and its associated actions
  pullState?: <S>(state: S) => PS; // The function that slices the global state this component consumes
  render: (options: {
    props?: P;
    state?: PS;
    localState?: LS;
    actions?: AS;
  }) => Vnode; // The render function
}): Vnode;
```
