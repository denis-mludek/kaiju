

export type RemoteData<D, E> =
  { type: 'notAsked' } |
  { type: 'loading' } |
  { type: 'success', data: D } |
  { type: 'failure', error: E }

export const NotAsked: RemoteData<any, any> = { type: 'notAsked' as 'notAsked' } // tslint:disable-line:no-any
export const Loading: RemoteData<any, any> = { type: 'loading' as 'loading' } // tslint:disable-line:no-any
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
    case 'notAsked':  return { loading: false }
    case 'loading':   return { loading: true }
    case 'success':   return { data: data.data, loading: false }
    case 'failure':   return { error: data.error, loading: false }
  }
}
