import { init } from 'snabbdom';

declare var require: any;

const patch = init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/eventlisteners')
]);

export default patch;
