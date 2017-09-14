
import { Observable } from './observable'


export default function merge(...sources) {
  return Observable(add => {
    const unsubs = sources.map(obs => obs.subscribe(add))
    return () => unsubs.forEach(unsub => unsub())
  })
}
