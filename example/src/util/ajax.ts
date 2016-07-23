import { Observable } from 'dompteuse/observable'
import flatMapLatest from 'dompteuse/observable/flatMapLatest'
import pure from 'dompteuse/observable/pure'
import fromPromise, { partition } from 'dompteuse/observable/fromPromise'
import map from 'dompteuse/observable/map'
import merge from 'dompteuse/observable/merge'


interface Options<A, B> {
  name: string
  ajax: (input: A) => Promise<B>
  callNow?: boolean
  trigger?: Observable<A>
}

interface Result<T> {
  data: Observable<T>,
  error: Observable<any>,
  loading: Observable<boolean>
}

export default function observeAjax<A, B>(options: Options<A, B>): Result<B> {
  let { name, trigger, ajax, callNow } = options

  if (!trigger)
    trigger = triggerNow()
  else if (callNow)
    trigger = merge(trigger, triggerNow())

  const [data, error] = partition(flatMapLatest(arg => fromPromise(ajax(arg)), trigger))

  const loading = merge(
    map(x => true, trigger),
    map(x => false, data),
    map(x => false, error)
  )

  return {
    data: data.named(name + 'Loaded'),
    error: error.named(name + 'Error'),
    loading: loading.named(name + 'Loading')
  }
}

function triggerNow(): Observable<any> {
  return pure(undefined)
}
