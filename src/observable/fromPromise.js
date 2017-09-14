import { Observable } from './observable'
import { Ok, Err } from 'space-lift'


export default function fromPromise(promise) {
  return Observable(add => {
    let active = true

    promise.then(
      value => { if (active) add(Ok(value)) },
      error => { if (active) add(Err(error)) }
    )

    return () => { active = false }
  })
  .named('fromPromise')
}
