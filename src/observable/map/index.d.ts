
import { Observable } from '../'


export default function map<A, B>(mapFn: (a: A) => B, obs: Observable<A>): Observable<B>
