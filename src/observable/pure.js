
import { Observable } from './observable'


export default function pure(value) {
  return Observable(add => add(value)).named('pure')
}
