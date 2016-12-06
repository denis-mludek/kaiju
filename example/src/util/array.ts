
/*
* Finds the first element of the array satisfying a predicate, or return undefined.
*/
export function find<T>(arr: T[], predicate: (t: T) => boolean): T | undefined {
  for (const item of arr) {
    if (predicate(item)) return item
  }
}
