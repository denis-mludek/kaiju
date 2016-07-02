
import Observable from '../'


export default function map(mapper, source) {
  return Observable.create(add => {
    return source.subscribe((val, name) => add(mapper(val), name))
  })
}
