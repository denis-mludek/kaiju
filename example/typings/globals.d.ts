
// Convenient alias to this common and verbose type
interface Obj<V> {
  [key: string]: V
}

/* Allows access to an Element property in dictionary style */
interface Element {
  [key: string]: {} | undefined
}

// Made available by webpack
declare function require(path: string): any
