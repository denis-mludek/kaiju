
import { Observable } from '../'


export default function partition<T>(
  predicate: (value: T) => boolean
  obs: Observable<T>
): [Observable<T>, Observable<T>]
