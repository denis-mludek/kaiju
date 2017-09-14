
import { Observable } from './observable'


export default function drop(count, source) {
  return Observable(add => {
    let dropped = 0
    return source.subscribe((val, name) => {
      if (dropped++ >= count) add(val, name)
    })
  })
}
