import { Vnode } from 'kaiju'


export function addClassName(node: Vnode, classname: string) {
  const attrs = node.data['attrs'] || (node.data['attrs'] = {})
  attrs['class'] = attrs['class'] ? attrs['class'] + ' ' + classname : classname
  return node
}
