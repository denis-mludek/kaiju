
import { Observable } from '../'


type Result<T> = { value: T } | { error: any }

export default function fromPromise<T>(promise: Promise<T>): Observable<Result<T>>

export function partition<T>(source: Observable<Result<T>>): [Observable<T>, Observable<any>]
