
import { Observable } from './observable';

export function sliding2(source) {
  return sliding(2, source);
}

export default function sliding(size, source) {
  var window = [];

  return Observable(function (add) {
    return source.subscribe(function (val, name) {
      window = [val].concat(window);
      window = window.slice(0, size);
      add(window, name);
    });
  });
}