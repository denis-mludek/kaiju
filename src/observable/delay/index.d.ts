
import { Observable } from '../'


/**
 * Delays all values by a fixed time offset
 */
export default function delay<A>(delay: number, obs: Observable<A>): Observable<A>
