
import { Observable } from '../'


export default function flatMapLatest<A, B>(
  mapFn: (a: A) => Observable<B>, obs: Observable<A>): Observable<B>
