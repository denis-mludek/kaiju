
export function findParentByAttr(attr: string, from: Element) {
  while (from && from.getAttribute) {
    if (from.getAttribute(attr)) return from
    from = from.parentElement!
  }
}
