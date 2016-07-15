
import { Observable } from '../'

type Function1<A, R> = (a: A) => R
type Function2<A, B, R> = (a: A, b: B) => R
type Function3<A, B, C, R> = (a: A, b: B, c: C) => R
type Cancellable = { cancel: () => void }


/**
 * Delays values until a certain amount of silence has passed.
 * Values in between silence periods are discarded.
 */
export default function debounce<A>(wait: number, obs: Observable<A>): Observable<A>


/**
 * Debounces a simple function
 */
export function debounceFunction<A, R>(wait: number, fn: Function1<A, R>): Function1<A, void> & Cancellable
export function debounceFunction<A, B, R>(wait: number, fn: Function2<A, B, R>): Function2<A, B, void> & Cancellable
export function debounceFunction<A, B, C, R>(wait: number, fn: Function3<A, B, C, R>): Function3<A, B, C, void> & Cancellable
