
import { Observable } from './'


export default function pure(value) {
  return Observable(add => add(value)).named('pure')
}
