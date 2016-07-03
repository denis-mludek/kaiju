
import Observable from '../'
import genericPartition from '../partition'
import map from '../map'


export default function fromPromise(promise) {
  return Observable.create(add => {
    let active = true

    promise.then(
      value => { if (active) add({ value }) },
      error => { if (active) add({ error }) }
    )

    return () => { active = false }
  })
  .named('fromPromise')
}

export function partition(results) {
  const [values, errors] = genericPartition(isValue, results)
  return [
    map(x => x.value, values),
    map(x => x.error, errors)
  ]
}

export function isValue(promiseResult) { return 'value' in promiseResult }
