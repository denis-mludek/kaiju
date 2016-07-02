
import Observable from '../'


export default function pure(value) {
  return Observable.create(add => add(value)).named('pure')
}
