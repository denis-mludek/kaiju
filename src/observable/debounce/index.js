
import Observable from '../'


export default function debounce(wait, source) {
  return Observable.create(add => {
    const debouncedAdd = debounceFunction(add, wait)

    const unsubscribe = source.subscribe((val, name) => {
      debouncedAdd(val, name)
    })

    return () => {
      unsubscribe()
      debouncedAdd.cancel()
    }
  })
}

export function debounceFunction(func, wait) {
  let timeout

  const debounced = function() {
    const context = this, args = arguments

    const later = function() {
      timeout = undefined
      func.apply(context, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }

  debounced.cancel = () => clearTimeout(timeout)
  return debounced
}
