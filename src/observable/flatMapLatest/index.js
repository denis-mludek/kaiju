
import Observable from '../create'


export default function flatMapLatest(mapper, source) {
  return Observable(add => {
    let currentUnsub

    const unsubSource = source.subscribe(val => {
      currentUnsub && currentUnsub()
      const mappedObs = mapper(val)
      currentUnsub = mappedObs.subscribe(add)
    })

    return () => {
      currentUnsub && currentUnsub()
      unsubSource()
    }
  })
}
