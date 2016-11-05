import { VNode } from 'kaiju'


export function addClassName(node: VNode, classname: string) {
  const attrs = node.data['attrs'] || (node.data['attrs'] = {})
  attrs['class'] = attrs['class'] ? attrs['class'] + ' ' + classname : classname
  return node
}
