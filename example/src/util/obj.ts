
export function copy<T extends Obj<{}>>(obj: T): T {
  const result = {} as T & Obj<{}>
  Object.keys(obj).forEach(key => result[key] = obj[key])
  return result
}


export function merge<A extends Record<string, {}>, B extends Record<string, {}>>(a: A, b: B): A & B {
  const result = {} as A & B
  Object.keys(a).forEach(key => result[key] = a[key])
  Object.keys(b).forEach(key => result[key] = b[key])
  return result
}


export function mapValues<K extends string, T, U>(obj: Record<K, T>, f: (k: string, x: T) => U): Record<K, U> {
  const keys = Object.keys(obj)
  const result = {} as Record<K, U>
  keys.forEach((k: K) => result[k] = f(k, obj[k]))
  return result
}


export function Set(values: string[]): Obj<number> {
  const set: Obj<number> = {}

  for (const value of values) {
    set[value] = 1
  }

  return set
}
