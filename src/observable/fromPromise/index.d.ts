
import { Observable } from '../'


/**
 * Either a Promise value or an Error thrown by the promise.
 */
type Result<T> = { value: T } | { error: any }

/**
 * Creates a new Observable from a Promise. The observable will produce only one value:
 * Either a { value: T } or an { error: any } object based on the result of the Promise.
 */
export default function fromPromise<T>(promise: Promise<T>): Observable<Result<T>>

/**
 * Partitions an Observable created with fromPromise into two observables: one carrying the value, another carrying the error.
 */
export function partition<T>(source: Observable<Result<T>>): [Observable<T>, Observable<any>]

/**
 * Returns whether the value produced by a fromPromise observable is the value of the promise.
 */
export function isValue<T>(result: Result<T>): result is { value: T }
