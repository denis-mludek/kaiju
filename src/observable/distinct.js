
import { Observable } from './observable'

const UNSET = {}

export default function distinct(compareFunction, source) {
  let previousValue = UNSET

  return Observable(add => {
    return source.subscribe((val, name) => {
      const shouldAdd = (
        previousValue === UNSET ||
        (compareFunction ? (compareFunction(val, previousValue) === false) : (val !== previousValue))
      )

      previousValue = val
      if (shouldAdd) add(val, name)
    })
  })
}