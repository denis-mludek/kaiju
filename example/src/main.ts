import { Router, State } from 'abyssa';
import { startApp } from 'dompteuse';

import patch from './snabbdom';
import app from './app';
import { routeChanged } from './action';


const router = Router({
  app: State('', {}, {
    index: State('', {}),
    blue: State('blue/:id', {}, {
      green: State('green', {}),
      red: State('red', {})
    })
  })
})
.on('ended', routeChanged)
.configure({ urlSync: 'hash' })
.init();

startApp({ app, patch, elm: document.body, log: true });
