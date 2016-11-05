import { Observable } from 'kaiju/observable'
import { partition } from 'kaiju/observable/fromPromise'


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
  error: Observable<{}>,
  loading: Observable<boolean>
}

/**
 * Creates a data, error and loading observables out of a one-off or recurrent ajax call
 */
export default function observeAjax<A, B>(options: Options<A, B>): Result<B> {
  let { name, trigger, ajax } = options

  const hasCallNowWith = 'callNowWith' in options

  const actualTrigger = (() => {
    if (trigger && hasCallNowWith) return Observable.merge(trigger, triggerNow(options.callNowWith!))
    if (trigger) return trigger
    else return triggerNow(undefined) as any as Observable<A>
  })()

  const [data, error] = partition(actualTrigger.flatMapLatest(arg => Observable.fromPromise(ajax(arg))))

  const loading = Observable.merge(
    actualTrigger.map(x => true),
    data.map(x => false),
    error.map(x => false)
  )

  return {
    data: data.named(name + 'Loaded'),
    error: error.named(name + 'Error'),
    loading: loading.named(name + 'Loading')
  }
}

function triggerNow<T>(value: T): Observable<T> {
  return Observable.pure(value)
}
