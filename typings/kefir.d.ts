// Type definitions for Kefir 3.2.0

// TODO: Proper type declarations for combine, merge, etc both as OO methods and on the kefir object.

export interface Observable<T> {
  _isObversable: T; // Duck typing Marker

	// Subscribe / add side effects
	onValue(callback: (value: T) => void): void;
	offValue(callback: (value: T) => void): void;
	onError(callback: (error: any) => void): void;
	offError(callback: (error: any) => void): void;
	onEnd(callback: () => void): void;
	offEnd(callback: () => void): void;
	onAny(callback: (event: Event<T | any>) => void): void;
	offAny(callback: (event: Event<T | any>) => void): void;
	log(name?: string): void;
	offLog(name?: string): void;
	flatten<U>(transformer?: (value: T) => U[]): Stream<U>;
	toPromise(PromiseConstructor?: any): any;
	toESObservable(): any;

  // Shared combinators between Stream and Property that always return the same type
  scan(fn: (prev: T, next: T) => T): Property<T>;
  scan<U>(fn: (prev: U, next: T) => U, seed: U): Property<U>;

  combine<U, V, W>(otherObs: Observable<U>, combinator: (t: T, u: U) => W): Stream<W>;
  zip<U, V, W>(otherObs: Observable<U>, combinator?: (value: T, ...values: U[]) => W): Stream<W>;
  merge<U, V>(otherObs: Observable<U>): Stream<T | U>;
  concat<U, V>(otherObs: Observable<U>): Stream<T | U>;
  flatMap<U, V>(transform: (value: T) => Observable<U>): Stream<U>;
  flatMapLatest<U, V>(fn: (value: T) => Observable<U>): Stream<U>;
  flatMapFirst<U, V>(fn: (value: T) => Observable<U>): Stream<U>;
  flatMapConcat<U, V>(fn: (value: T) => Observable<U>): Stream<U>;
  flatMapConcurLimit<U, V>(fn: (value: T) => Observable<U>, limit: number): Stream<U>;
  flatMapErrors<U, V>(transform: (error: any) => Observable<U>): Stream<U>;
}

export interface Stream<T> extends Observable<T> {
  _isStream: T;

	toProperty(getCurrent?: () => T): Property<T>;

	// Modify an stream
	map<U>(fn: (value: T) => U): Stream<U>;
	filter(predicate?: (value: T) => boolean): Stream<T>;
	take(n: number): Stream<T>;
	takeWhile(predicate?: (value: T) => boolean): Stream<T>;
	last(): Stream<T>;
	skip(n: number): Stream<T>;
	skipWhile(predicate?: (value: T) => boolean): Stream<T>;
	skipDuplicates(comparator?: (a: T, b: T) => boolean): Stream<T>;
	diff(fn?: (prev: T, next: T) => T, seed?: T): Stream<T>;
	delay(wait: number): Stream<T>;
	throttle(wait: number, options?: {leading?: boolean, trailing?: boolean}): Stream<T>;
	debounce(wait: number, options?: {immediate: boolean}): Stream<T>;
	mapErrors<U>(fn: (error: any) => U): Stream<T>;
	filterErrors(predicate?: (error: any) => boolean): Stream<T>;
	takeErrors(n: number): Stream<T>;
	ignoreValues(): Stream<void>;
	ignoreErrors(): Stream<T>;
	ignoreEnd(): Stream<T>;
	beforeEnd<U>(fn: () => U): Stream<T | U>;
	slidingWindow(max: number, mix?: number): Stream<T[]>;
	bufferWhile(predicate: (value: T) => boolean): Stream<T[]>;
	bufferWithCount(count: number, options?: {flushOnEnd: boolean}): Stream<T[]>;
	bufferWithTimeOrCount(interval: number, count: number, options?: {flushOnEnd: boolean}): Stream<T[]>;
	transduce<U>(transducer: any): Stream<U>;
	withHandler<U, V>(handler: (emitter: Emitter<U>, event: Event<T | any>) => void): Stream<U>;

	// Combinators
	filterBy<U>(otherObs: Observable<boolean>): Stream<T>;
	sampledBy<U, V>(otherObs: Observable<U>, combinator?: (a: T, b: U) => V): Stream<V>;
	skipUntilBy<U>(otherObs: Observable<U>): Stream<U>;
	takeUntilBy<U>(otherObs: Observable<U>): Stream<U>;
	bufferBy<U, V>(otherObs: Observable<U>, options?: {flushOnEnd: boolean}): Stream<T[]>;
	bufferWhileBy<U>(otherObs: Observable<boolean>, options?: {flushOnEnd?: boolean, flushOnChange?: boolean}): Stream<T[]>;
}

export interface Property<T> extends Observable<T> {
  _isProperty: T;

	changes(): Stream<T>;

	// Modify an property
	map<U>(fn: (value: T) => U): Property<U>;
	filter(predicate?: (value: T) => boolean): Property<T>;
	take(n: number): Property<T>;
	takeWhile(predicate?: (value: T) => boolean): Property<T>;
	last(): Property<T>;
	skip(n: number): Property<T>;
	skipWhile(predicate?: (value: T) => boolean): Property<T>;
	skipDuplicates(comparator?: (a: T, b: T) => boolean): Property<T>;
	diff(fn?: (prev: T, next: T) => T, seed?: T): Property<T>;
	delay(wait: number): Property<T>;
	throttle(wait: number, options?: {leading?: boolean, trailing?: boolean}): Property<T>;
	debounce(wait: number, options?: {immediate: boolean}): Property<T>;
	mapErrors<U>(fn: (error: any) => U): Property<T>;
	filterErrors(predicate?: (error: any) => boolean): Property<T>;
	takeErrors(n: number): Stream<T>;
	ignoreValues(): Property<void>;
	ignoreErrors(): Property<T>;
	ignoreEnd(): Property<T>;
	beforeEnd<U>(fn: () => U): Property<T | U>;
	slidingWindow(max: number, mix?: number): Property<T[]>;
	bufferWhile(predicate: (value: T) => boolean): Property<T[]>;
	bufferWithCount(count: number, options?: {flushOnEnd: boolean}): Property<T[]>;
	bufferWithTimeOrCount(interval: number, count: number, options?: {flushOnEnd: boolean}): Property<T[]>;
	transduce<U>(transducer: any): Property<U>;
	withHandler<U, V>(handler: (emitter: Emitter<T>, event: Event<T>) => void): Property<U>;

	// Combine two properties
	filterBy(otherObs: Observable<boolean>): Property<T>;
	sampledBy<U, W>(otherObs: Observable<U>, combinator?: (a: T, b: U) => W): Property<W>;
	skipUntilBy<U>(otherObs: Observable<U>): Property<U>;
	takeUntilBy<U>(otherObs: Observable<U>): Property<U>;
	bufferBy<U>(otherObs: Observable<U>, options?: {flushOnEnd: boolean}): Property<T[]>;
	bufferWhileBy(otherObs: Observable<boolean>, options?: {flushOnEnd?: boolean, flushOnChange?: boolean}): Property<T[]>;
}

export interface ObservablePool<T> extends Observable<T> {
	plug(obs: Observable<T>): void;
	unPlug(obs: Observable<T>): void;
}

export interface Event<T> {
	type: string;
	value: T;
}

export interface Emitter<T> {
	emit(value: T): void;
	error(error: any): void;
	end(): void;
	emitEvent(event: {type: string, value: T}): void;
}

// Create a stream
export function never(): Stream<void>;
export function later<T>(wait: number, value: T): Stream<T>;
export function interval<T>(interval: number, value: T): Stream<T>;
export function sequentially<T>(interval: number, values: T[]): Stream<T>;
export function fromPoll<T>(interval: number, fn: () => T): Stream<T>;
export function withInterval<T, S>(interval: number, handler: (emitter: Emitter<T>) => void): Stream<T>;
export function fromCallback<T>(fn: (callback: (value: T) => void) => void): Stream<T>;
export function fromNodeCallback<T, S>(fn: (callback: (error: S, result: T) => void) => void): Stream<T>;
export function fromEvents<T, S>(target: EventTarget | { on: Function, off: Function }, eventName: string): Stream<T>;
export function stream<T>(subscribe: (emitter: Emitter<T>) => Function | void): Stream<T>;
export function fromESObservable<T>(observable: any): Stream<T>

// Create a property
export function constant<T>(value: T): Property<T>;
export function constantError<T>(error: T): Property<void>;
export function fromPromise<T>(promise: any): Property<T>;

// Combine observables
export function pool<T>(): ObservablePool<T>;
export function repeat<T>(generator: (i: number) => Observable<T> | boolean): Observable<T>;
