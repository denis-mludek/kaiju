
import { Observable } from './observable';

export default function map(mapper, source) {
  return Observable(function (add) {
    return source.subscribe(function (val, name) {
      return add(mapper(val), name);
    });
  });
}