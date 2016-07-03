
import { Observable } from '../'


/**
 * Partitions an observable into two observables based on a predicate
 */
export default function partition<T>(
  predicate: (value: T) => boolean,
  obs: Observable<T>
): [Observable<T>, Observable<T>]
