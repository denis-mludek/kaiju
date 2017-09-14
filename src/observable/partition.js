
import { Observable } from './observable'


export default function partition(predicate, source) {
  return [
    Observable(add => {
      return source.subscribe((value, name) => { if (predicate(value)) add(value, name) })
    }),
    Observable(add => {
      return source.subscribe((value, name) => { if (!predicate(value)) add(value, name) })
    }),
  ]
}
