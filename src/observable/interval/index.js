
import Observable from '../create'


export default function interval(time) {
  return Observable(add => {
    const intervalId = setInterval(add, time)
    return () => clearInterval(intervalId)
  })
  .named('interval')
}
