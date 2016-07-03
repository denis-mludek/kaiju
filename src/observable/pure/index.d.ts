
import { Observable } from '../'

/**
 * Creates a new observable that produces one value immediately.
 */
export default function pure<A>(value: A): Observable<A>
