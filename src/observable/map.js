
import { Observable } from './observable'


export default function map(mapper, source) {
  return Observable(add => {
    return source.subscribe((val, name) => add(mapper(val), name))
  })
}
