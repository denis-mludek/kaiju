import { h } from 'dompteuse';

import { contentAnimation } from './animation';


export default function() {
  return h('h1', { hook: contentAnimation }, 'Index');
};
