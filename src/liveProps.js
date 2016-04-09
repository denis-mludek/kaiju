
// Update the element properties even if the vnode value did not change

function updateProps(oldVnode, vnode) {
  let key, cur, old, elm = vnode.elm,
      props = vnode.data.liveProps || {};

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
