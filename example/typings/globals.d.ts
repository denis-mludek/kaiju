
// Convenient alias to this common and verbose type
interface Obj<V> {
  [key: string]: V
}

// Made available by webpack
declare function require(path: string): any
