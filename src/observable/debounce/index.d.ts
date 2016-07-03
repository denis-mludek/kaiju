
import { Observable } from '../'


/**
 * Delays values until a certain amount of silence has passed
 */
export default function debounce<A>(wait: number, obs: Observable<A>): Observable<A>
