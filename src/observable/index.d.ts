

export interface Observable<T> {
  subscribe: (onValue: (val: T) => void) => Function | void
  named: (name: string) => this
  (): T | void
}

export interface ObservableWithInitialValue<T> extends Observable<T> {
  (): T
}

export interface ObservableObject {
  create: <T>(add: (val: T) => Function, options?: { replay?: boolean }) => Observable<T>
}
