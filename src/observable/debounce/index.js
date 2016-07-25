
import Observable from '../create'


export default function debounce(wait, source) {
  return Observable(add => {
    const debouncedAdd = debounceFunction(wait, add)
    const unsubscribe = source.subscribe(debouncedAdd)

    return () => {
      unsubscribe()
      debouncedAdd.cancel()
    }
  })
}

export function debounceFunction(wait, func) {
  let timeout

  const debounced = function() {
    const args = arguments

    const later = function() {
      timeout = undefined
      func.apply(null, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }

  debounced.cancel = () => clearTimeout(timeout)
  return debounced
}
