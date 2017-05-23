/* tslint:disable:no-any */

import { Observable } from 'kaiju/observable'

import { RemoteData, NotAsked, Loading, Success, Failure } from 'util/remoteData'


interface Options<I, O> {
  /** name for logging purposes: This will be the debug name of the Observable */
  name: string

  /** The function returning the Promise result of the ajax call */
  ajax: (input: I) => Promise<O>

  /** If this property is specified, the ajax function will be called immediately with its value */
  callNowWith?: I
}

interface NoArgOptions<O> {
  /** name for logging purposes: This will be the debug name of the Observable */
  name: string

  /** The function returning the Promise result of the ajax call */
  ajax: () => Promise<O>

  /** If this property is specified, the ajax function will be called immediately */
  callNow?: true
}


interface NoArgHandle<O, E> {
  data: Observable<RemoteData<O, E>>

  /* Make an ajax call again */
  call(): void
}

interface Handle<I, O, E> {
  data: Observable<RemoteData<O, E>>

  /* Make an ajax call again */
  call(value: I): void
}

export default function observeAjax<O, E>(options: NoArgOptions<O>): NoArgHandle<O, E>
export default function observeAjax<I, O, E>(options: Options<I, O>): Handle<I, O, E>
/**
 * Creates a data, error and loading observables out of a one-off or recurrent ajax call
 */
export default function observeAjax(options: any): any {
  const { name, ajax } = options

  const call = Observable()
  const hasCallNowWith = ('callNowWith' in options) || ('callNow' in options)

  const trigger = hasCallNowWith
    ? Observable.merge(call, Observable.pure(options.callNowWith!))
    : call

  const result = trigger.flatMapLatest(arg =>
    Observable.fromPromise<{}, {}>(ajax(arg))).map(r =>
      r.fold(Failure, Success)
    )

  const loading = trigger.map(_ => Loading)

  const notAsked = hasCallNowWith ? Observable() : Observable.pure(NotAsked)

  const data = Observable.merge(notAsked, loading, result)

  return {
    data: data.named(name + '_remoteData'),
    call: (value: {}) => { call(value) } // We want call() to return undefined so it can easily be used inside Store handlers.
  }
}
