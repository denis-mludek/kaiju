
import { Observable } from './observable'


export default function throttle(wait, source) {
  return Observable(add => {
    const throttledAdd = throttleFunction(wait, add)
    const unsubscribe = source.subscribe(throttledAdd)

    return () => {
      unsubscribe()
      throttledAdd.cancel()
    }
  })
}


export function throttleFunction(wait, func) {
  let lastCallTime
  let timeout
  let args

  const throttled = function() {
    // Always use the latest arguments, even in an already scheduled call
    args = arguments

    // A throttled call is already scheduled, noop
    if (timeout !== undefined) return

    const delta = lastCallTime ? (wait - Date.now() + lastCallTime) : 0

    timeout = setTimeout(() => {
      timeout = undefined
      lastCallTime = Date.now()
      func.apply(null, args)
    }, delta)
  }

  throttled.cancel = () => clearTimeout(timeout)
  return throttled
}
