
import { Observable } from '../'


/**
 * Groups values in fixed size blocks (of size 2) by passing a "sliding window" over them.
 * An array becomes the value of the new observable. It will have a size of 1 the first time a value is produced,
 * then a size of 2 for subsequent values.
 * The newest value is always found at the index 0 of the Array for convenience and type safety.
 */
export function sliding2<T>(obs: Observable<T>): Observable<[T, T | void]>


/**
 * Groups values in fixed size blocks by passing a "sliding window" over them.
 * An array becomes the value of the new observable. It will have a size of 1 the first time a value is produced,
 * then an increasing size of max (maxWindowSize parameter) for subsequent values.
 * The newest value is always found at the index 0 of the Array for convenience (...rest parameters).
 */
export default function sliding<T>(maxWindowSize: number, obs: Observable<T>): Observable<Array<T>>
