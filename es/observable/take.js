
import { Observable } from './observable';

export default function take(count, source) {
  return Observable(function (add) {
    var taken = 0;
    return source.subscribe(function (val, name) {
      if (taken++ < count) add(val, name);
    });
  });
}