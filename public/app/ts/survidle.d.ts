declare module _ {
	interface LoDashStatic {
		mixin(any: any): void;
	}
}

interface Number {
	increment(by: number, minimum?: number);
	decrement(by: number, minimum?: number);
}
