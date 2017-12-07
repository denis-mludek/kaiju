/* tslint:disable:no-any */

/** The model for a piece of asynchronous data */
export type RemoteData<D, E> =
  NotAsked |
  Loading |
  Refreshing<D> |
  Success<D> |
  Failure<E>


export type NotAsked = { type: 'notAsked' }
export type Loading = { type: 'loading' }
export type Refreshing<D> = { type: 'refreshing', data: D }
export type Success<D> = { type: 'success', data: D }
export type Failure<E> = { type: 'failure', error: E }

export const NotAsked: RemoteData<any, any> = { type: 'notAsked' }
export const Loading: RemoteData<any, any> = { type: 'loading' }
export const Refreshing = <D, E>(data: D): RemoteData<D, E> => ({ type: 'refreshing', data })
export const Success = <D, E>(data: D): RemoteData<D, E> => ({ type: 'success', data })
export const Failure = <D, E>(error: E): RemoteData<D, E> => ({ type: 'failure', error })


type Unpacked<D, E> = {
  data?: D,
  error?: E,
  loading: boolean
}

/**
 * Transforms a RemoteData union object to data/error/loading primitives
 * which are sometimes more convenient to manipulate.
 */
export function unpack<D, E>(rd: RemoteData<D, E>): Unpacked<D, E> {
  switch (rd.type) {
    case 'notAsked':   return { loading: false }
    case 'loading':    return { loading: true }
    case 'refreshing': return { loading: true, data: rd.data }
    case 'success':    return { data: rd.data, loading: false }
    case 'failure':    return { error: rd.error, loading: false }
  }
}
