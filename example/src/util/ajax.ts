import { Observable, flatMapLatest, pure, map, merge } from 'kaiju/observable'
import fromPromise, { partition } from 'kaiju/observable/fromPromise'


interface Options<A, B> {
  /** name for logging purposes */
  name: string

  /** The function returning the Promise result of the ajax call */
  ajax: (input: A) => Promise<B>

  /** If this property is specified, the ajax function will be called immediately with its value */
  callNowWith?: A

  /** A trigger observable that should be the source of more ajax calls */
  trigger?: Observable<A>
}

interface Result<T> {
  data: Observable<T>,
  error: Observable<any>,
  loading: Observable<boolean>
}

/**
 * Creates a data, error and loading observables out of a one-off or recurrent ajax call
 */
export default function observeAjax<A, B>(options: Options<A, B>): Result<B> {
  let { name, trigger, ajax } = options

  const shouldCallNow = 'callNowWith' in options

  const actualTrigger: Observable<A> = (() => {
    if (trigger && shouldCallNow) return merge(trigger, triggerNow(options.callNowWith))
    if (trigger && !shouldCallNow) return trigger
    else return triggerNow(undefined)
  })()

  const [data, error] = partition(flatMapLatest(arg => fromPromise(ajax(arg)), actualTrigger))

  const loading = merge(
    map(x => true, actualTrigger),
    map(x => false, data),
    map(x => false, error)
  )

  return {
    data: data.named(name + 'Loaded'),
    error: error.named(name + 'Error'),
    loading: loading.named(name + 'Loading')
  }
}

function triggerNow<T>(value: T): Observable<T> {
  return pure(value)
}
