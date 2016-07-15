
import Observable from '../'


export default function filter(predicate, source) {
  return Observable.create(add => {
    return source.subscribe((val, name) => {
      if (predicate(val)) add(val, name)
    })
  })
}
