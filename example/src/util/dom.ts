
export function findParentByClass(className: string, from: Element) {
  while (from && from.classList) {
    if (from.classList.contains(className)) return from
    from = from.parentElement
  }
}
