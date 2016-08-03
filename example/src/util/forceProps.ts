import { Vnode } from 'kaiju'

// Updates the element properties even if the vnode value did not change (but the Element's value did)
// https://github.com/paldepind/snabbdom/issues/53
// Mostly useful when trying to force-prevent-default by writing back.

function updateProps(oldVnode: Vnode, vnode: Vnode) {
  let key: string
  let cur: any
  let old: any
  const elm: any = vnode.elm
  const props = vnode.data['forceProps'] || {}

  for (key in props) {
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
