
import { Observable } from './observable';

export default function partition(predicate, source) {
  return [Observable(function (add) {
    return source.subscribe(function (value, name) {
      if (predicate(value)) add(value, name);
    });
  }), Observable(function (add) {
    return source.subscribe(function (value, name) {
      if (!predicate(value)) add(value, name);
    });
  })];
}