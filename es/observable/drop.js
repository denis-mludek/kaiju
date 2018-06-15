
import { Observable } from './observable';

export default function drop(count, source) {
  return Observable(function (add) {
    var dropped = 0;
    return source.subscribe(function (val, name) {
      if (dropped++ >= count) add(val, name);
    });
  });
}