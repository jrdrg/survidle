declare module _ {
	interface LoDashStatic {
		mixin(any: any): void;
		sum(object): number;
		randomItem(array): any;
	}

	interface LoDashArrayWrapper<T> {
		sum(): LoDashArrayWrapper<T>;
	}
}

interface Number {
	increment(by: number, minimum?: number);
	decrement(by: number, minimum?: number);
	leftPadding(padding: number);
}

declare var chance: {
	bool(options?: any): boolean;
	floating(options?: any): number;
}
