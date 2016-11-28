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

// SP should ideally extend Obj<Store<{}>> but it's then too annoying to write on the call site
export function ComponentWithStores<P extends Obj<any>, S, SP>(
  options: ComponentWithStoresOptions<P, S, SP>,
  storePropsFn: (props: P) => SP): VNode {

  const node = Component<P, S>(options)
  const props = node.data['component'].props
  const currentHooks = node.data.hook || (node.data.hook = {})
  const currentInitHook = currentHooks.init
  const currentDestroyHook = currentHooks.destroy

  let stores: SP & Obj<Store<{}>>

  currentHooks.init = (node: VNode) => {
    stores = storePropsFn(props) as any
    Object.keys(stores).forEach(storeKey => props[storeKey] = stores[storeKey])
    currentInitHook && currentInitHook(node)
  }

  currentHooks.destroy = (node: VNode) => {
    Object.keys(stores).forEach(key => stores[key].destroy())
    currentDestroyHook && currentDestroyHook(node)
  }

  return node
}
