
/* tslint:disable:no-any */

/** The model for some data fetched asynchronously */
export type RemoteData<D, E> =
  NotAsked |
  Loading |
  Success<D> |
  Failure<E>


export type NotAsked = { type: 'notAsked' }
export type Loading = { type: 'loading' }
export type Success<D> = { type: 'success', data: D }
export type Failure<E> = { type: 'failure', error: E }

export const NotAsked: RemoteData<any, any> = { type: 'notAsked' }
export const Loading: RemoteData<any, any> = { type: 'loading' }
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
export function unpack<D, E>(data: RemoteData<D, E>): Unpacked<D, E> {
  switch (data.type) {
    case 'notAsked': return { loading: false }
    case 'loading':  return { loading: true }
    case 'success':  return { data: data.data, loading: false }
    case 'failure':  return { error: data.error, loading: false }
  }
}
