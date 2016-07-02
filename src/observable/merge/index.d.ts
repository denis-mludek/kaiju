
import { Observable } from '../'


export default function merge<T>(...obss: Array<Observable<T>>): Observable<T>
