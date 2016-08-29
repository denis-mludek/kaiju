
// TODO: replace by proper typesafe version
export function merge<T extends Object, U extends Object>(obj: T, other: U): T & U {
  let result: any = copy(obj)
  Object.keys(other).forEach(key => result[key] = (<any>other)[key])
  return <T & U>result
}

export function copy<T extends Object>(obj: T): T {
  let result: any = {}
  Object.keys(obj).forEach(key => result[key] = (<any>obj)[key])
  return result as T
}

export function Set(values: string[]): { [key: string]: number } {
  let set: any = {}
  for (let i = 0; i < values.length; i++) {
    set[values[i]] = 1
  }
  return set
}
