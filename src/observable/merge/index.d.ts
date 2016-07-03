
import { Observable } from '../'


/**
 * Merges all the observables into one
 */
export default function merge<T>(...obss: Array<Observable<T>>): Observable<T>
