import { VNode } from 'kaiju'

// Updates the element properties even if the vnode value did not change (but the Element's value did)
// https://github.com/paldepind/snabbdom/issues/53
// Mostly useful when trying to force-prevent-default by writing back (some events, like 'input' are not cancellable).

function updateProps(oldVNode: VNode, vnode: VNode) {
  let cur: {} | undefined
  let old: {} | undefined
  const elm = vnode.elm
  const props = vnode.data['forceProps'] || {}

  for (const key in props) {
    cur = props[key]
    old = elm[key]
    if (old !== cur) {
      if (!cur) delete elm[key]
      else elm[key] = cur
    }
  }
}

const module = {
  create: updateProps,
  update: updateProps
}

export default module
