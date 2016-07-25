
import Observable from '../create'


export default function pure(value) {
  return Observable(add => add(value)).named('pure')
}
