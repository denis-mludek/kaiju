import './logger';

import { startApp } from 'dompteuse';
import app from './app';

startApp({ app, elm: document.body });

console.log('after startApp', performance.now());
