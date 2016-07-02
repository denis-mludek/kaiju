
import Observable from '../'


export default function merge(...sources) {
  return Observable.create(add => {
    const unsubs = sources.map(obs => obs.subscribe(add))
    return () => unsubs.forEach(unsub => unsub())
  })
}
