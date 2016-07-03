
import { Observable } from '../'


/**
 * Maps the values of an observable.
 */
export default function map<A, B>(mapFn: (a: A) => B, obs: Observable<A>): Observable<B>
