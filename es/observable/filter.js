
import { Observable } from './observable';

export default function filter(predicate, source) {
  return Observable(function (add) {
    return source.subscribe(function (val, name) {
      if (predicate(val)) add(val, name);
    });
  });
}