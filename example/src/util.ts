
export function extend<T extends Object, U extends Object>(obj: T, other: U): T & U {
  let result: any = copy(obj);
  Object.keys(other).forEach(key => result[key] = (<any>other)[key]);
  return <T & U>result;
};

export function copy<T extends Object>(obj: T): T {
  let result: any = {};
  Object.keys(obj).forEach(key => result[key] = (<any>obj)[key]);
  return result as T;
};
