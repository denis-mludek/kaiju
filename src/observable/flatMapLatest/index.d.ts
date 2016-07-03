
import { Observable } from '../'


/*
 * Maps and flatten an observable then only publish values from the observable mapped last.
 */
export default function flatMapLatest<A, B>(
  mapFn: (a: A) => Observable<B>, obs: Observable<A>): Observable<B>
