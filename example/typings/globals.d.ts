
// Convenient alias to this common and verbose type
interface Obj<V> {
  [key: string]: V
}

/* Allows access to an Element property in dictionary style */
interface Element {
  [key: string]: {} | null
}

// Made available by webpack; We only use it for css-modules so type the return value accordingly
declare function require(path: string): Obj<string>
