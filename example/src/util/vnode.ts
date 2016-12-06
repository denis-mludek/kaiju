import { VNode, Component, ConnectParams, RenderParams } from 'kaiju'
import { Store } from 'kaiju/store'


/* Adds an extra classname to an VNode not created by the code wanting to add the classname */
export function addClassName(node: VNode, classname: string): VNode {
  const attrs = node.data['attrs'] || (node.data['attrs'] = {})
  attrs['class'] = attrs['class'] ? attrs['class'] + ' ' + classname : classname
  return node
}


interface ComponentWithStoresOptions<P, S, SP> {
  name: string
  props?: P
  initState: (initProps: P & SP) => S
  connect: (params: ConnectParams<P & SP, S>) => void
  render: (params: RenderParams<P & SP, S>) => VNode
}

export function ComponentWithStores<P extends {}, S, SP extends Obj<Store<{}>>>(
  options: ComponentWithStoresOptions<P, S, SP>,
  storePropsFn: (props: P) => SP): VNode {

  const result = Component<P, S>(options)

  const hooks = result.data.hook || (result.data.hook = {})

  result.data['ComponentWithStores'] = {
    previousHooks: {
      init: hooks.init,
      postpatch: hooks.postpatch,
      destroy: hooks.destroy
    },
    storePropsFn
  }

  hooks.init = init
  hooks.postpatch = postpatch
  hooks.destroy = destroy

  return result
}

function init(node: VNode) {
  const data = node.data['ComponentWithStores']
  const { storePropsFn, previousHooks } = data
  const props = node.data['component'].props
  const stores = data.stores = storePropsFn(props)
  Object.keys(stores).forEach(storeKey => props[storeKey] = stores[storeKey])
  if (previousHooks.init) previousHooks.init(node)
}

function postpatch(oldNode: VNode, newNode: VNode) {
  const data = oldNode.data['ComponentWithStores']
  const { stores, previousHooks } = data
  newNode.data['ComponentWithStores'] = oldNode.data['ComponentWithStores']
  const props = newNode.data['component'].props
  Object.keys(stores).forEach(storeKey => props[storeKey] = stores[storeKey])
  if (previousHooks.postpatch) previousHooks.postpatch(oldNode, newNode)
}

function destroy(node: VNode) {
  const { stores, previousHooks } = node.data['ComponentWithStores']
  Object.keys(stores).forEach(key => stores[key].destroy())
  if (previousHooks.destroy) previousHooks.destroy(node)
}
