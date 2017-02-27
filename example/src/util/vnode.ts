import { VNode } from 'kaiju'


/* Adds an extra classname to an VNode not created by the code wanting to add the classname */
export function addClassName(node: VNode, classname: string): VNode {
  const attrs = node.data.attrs || (node.data.attrs = {})
  attrs.class = attrs.class ? attrs.class + ' ' + classname : classname
  return node
}
