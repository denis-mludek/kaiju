
import { Observable } from '../'


/**
 * Filters the values of an observable.
 */
export default function filter<T>(predicate: (t: T) => boolean, obs: Observable<T>): Observable<T>
