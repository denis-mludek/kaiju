
/*
* Finds the first element of the array satisfying a predicate, or return undefined.
*/
export function find<T>(arr: Array<T>, predicate: (t:T) => boolean): T | void {
  for (let i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) return arr[i]
  }
}
