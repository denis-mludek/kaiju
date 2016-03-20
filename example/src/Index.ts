import h = require('snabbdom/h');

import { contentAnimation } from './animation';


export default function() {
  return h('h1', { hook: contentAnimation }, 'Index');
};
