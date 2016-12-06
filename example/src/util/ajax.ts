import { Observable } from 'kaiju/observable'
import { partition } from 'kaiju/observable/fromPromise'


interface Options<I, O> {
  /** name for logging purposes: This will be the debug name of the data Observable */
  name: string

  /** The function returning the Promise result of the ajax call */
  ajax: (input: I) => Promise<O>

  /** If this property is specified, the ajax function will be called immediately with its value */
  callNowWith?: I
}

interface Result<I, O> {
  data: Observable<O>
  error: Observable<{}>
  loading: Observable<boolean>

  /* Make an ajax call again */
  call: (value: I) => void
}

/**
 * Creates a data, error and loading observables out of a one-off or recurrent ajax call
 */
export default function observeAjax<I, O>(options: Options<I, O>): Result<I, O> {
  const { name, ajax } = options

  const call = Observable<I>()
  const hasCallNowWith = 'callNowWith' in options

  const trigger = hasCallNowWith
    ? Observable.merge(call, Observable.pure(options.callNowWith!))
    : call

  const [data, error] = partition(trigger.flatMapLatest(arg => Observable.fromPromise(ajax(arg))))

  const loading = Observable.merge(
    trigger.map(_ => true),
    data.map(_ => false),
    error.map(_ => false)
  )

  return {
    data: data.named(name + 'Loaded'),
    error: error.named(name + 'Error'),
    loading: loading.named(name + 'Loading'),
    call: (value: I) => { call(value) } // We want call() to return undefined so it can easily be used inside Store handlers.
  }
}
