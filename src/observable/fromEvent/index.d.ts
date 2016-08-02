
import { Observable } from '../'


/*
 * Listens for DOM events at the specified element.
 */
export default function fromEvent(name: string, el: Element): Observable<Event>

/*
 * Listens for delegated DOM events at the specified parent element and for children matching the passed CSS selector.
 */
export default function fromEvent(name: string, el: Element, childSelector: string): Observable<Event>
