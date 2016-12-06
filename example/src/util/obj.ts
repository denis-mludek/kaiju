
export function copy<T extends Obj<{}>>(obj: T): T {
  const result = {} as T & Obj<{}>
  Object.keys(obj).forEach(key => result[key] = obj[key])
  return result
}

export function Set(values: string[]): Obj<number> {
  const set: Obj<number> = {}

  for (const value of values) {
    set[value] = 1
  }

  return set
}
