
import { Observable } from './observable'


export default function interval(time) {
  return Observable(add => {
    const intervalId = setInterval(add, time)
    return () => clearInterval(intervalId)
  })
  .named('interval')
}
