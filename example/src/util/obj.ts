
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
