import { Observable } from './'


export default function fromPromise(promise) {
  return Observable(add => {
    let active = true

    promise.then(
      value => { if (active) add({ type: 'success', value }) },
      error => { if (active) add({ type: 'failure', error }) }
    )

    return () => { active = false }
  })
  .named('fromPromise')
}
