
import Observable from '../'


export default function delay(delayValue, source) {
  return Observable.create(add => {
    const currentTimeouts = []

    const unsubSource = source.subscribe((val, name) => {

      const timeout = setTimeout(() => {
        const index = currentTimeouts.indexOf(timeout)
          currentTimeouts.splice(index, 1)
          add(val, name)
        }, delayValue)

      currentTimeouts.push(timeout)
    })

    return () => {
      currentTimeouts.forEach(timeout => clearTimeout(timeout))
      unsubSource()
    }
  })
}
