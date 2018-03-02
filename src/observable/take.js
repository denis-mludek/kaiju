
import { Observable } from './observable'


export default function take(count, source) {
  return Observable(add => {
    let taken = 0
    return source.subscribe((val, name) => {
      if (taken++ < count) add(val, name)
    })
  })
}
