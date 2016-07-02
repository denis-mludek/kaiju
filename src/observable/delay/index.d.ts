
import { Observable } from '../'


export default function delay<A>(delay: number, obs: Observable<A>): Observable<A>
