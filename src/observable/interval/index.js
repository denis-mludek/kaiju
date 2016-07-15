
import Observable from '../'


export default function interval(time) {
  return Observable.create(add => {
    const intervalId = setInterval(add, time)
    return () => clearInterval(intervalId)
  })
  .named('interval')
}
