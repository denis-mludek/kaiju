
export function copy<T extends {}>(obj: T): T {
  let result = {} as T & Obj<any>
  Object.keys(obj).forEach(key => result[key] = (<any>obj)[key])
  return result
}

export function Set(values: string[]): Obj<number> {
  let set: Obj<number> = {}
  for (let i = 0; i < values.length; i++) {
    set[values[i]] = 1
  }
  return set
}
