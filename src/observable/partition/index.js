
import Observable from '../'


export default function partition(predicate, source) {
  return [
    Observable.create(add => {
      return source.subscribe((value, name) => { if (predicate(value)) add(value, name) })
    }),
    Observable.create(add => {
      return source.subscribe((value, name) => { if (!predicate(value)) add(value, name) })
    }),
  ]
}
