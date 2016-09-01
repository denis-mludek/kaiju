
import { Observable } from '../'

type Function1<A, R> = (a: A) => R
type Function2<A, B, R> = (a: A, b: B) => R
type Function3<A, B, C, R> = (a: A, b: B, c: C) => R
type Cancellable = { cancel: () => void }


/**
 * Delays values so that values are produced at most once per every 'time' milliseconds
 */
export default function throttle<A>(time: number, obs: Observable<A>): Observable<A>


/**
 * Util: Throttles a function.
 */
export function throttleFunction<A, R>(time: number, fn: Function1<A, R>): Function1<A, void> & Cancellable
export function throttleFunction<A, B, R>(time: number, fn: Function2<A, B, R>): Function2<A, B, void> & Cancellable
export function throttleFunction<A, B, C, R>(time: number, fn: Function3<A, B, C, R>): Function3<A, B, C, void> & Cancellable
