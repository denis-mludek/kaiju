
import { Observable } from '../'


export default function debounce<A>(wait: number, obs: Observable<A>): Observable<A>
