
import { Observable } from '../'

/**
 * Creates a new observable that produces undefined values at the provided interval in milliseconds.
 */
export default function interval(time: number): Observable<void>
