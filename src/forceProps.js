
// Update the element properties even if the vnode value did not change (but the Element's value did)
// https://github.com/paldepind/snabbdom/issues/53

function updateProps(oldVnode, vnode) {
  let key, cur, old, elm = vnode.elm,
      props = vnode.data.forceProps || {};

  for (key in props) {
    cur = props[key];
    old = elm[key];
    if (old !== cur) {
      if (!cur) delete elm[key];
      else elm[key] = cur;
    }
  }
}

module.exports = {
  create: updateProps,
  update: updateProps
};
