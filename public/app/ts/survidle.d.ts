declare module _ {
	interface LoDashStatic {
		mixin(any: any): void;
		sum(object): number;
		randomItem(array): any;
		pointsDistance(x1: number, y1: number, x2: number, y2: number): number;
	}

	interface LoDashArrayWrapper<T> {
		sum(): LoDashArrayWrapper<T>;
	}
}

interface Number {
	increment(by: number, minimum?: number);
	decrement(by: number, minimum?: number);
}

interface String {
	title(): string;
}

declare var chance: {
	bool(options?: any): boolean;
	floating(options?: any): number;
	integer(options?: any): number;
	weighted(options: string[], weights?: number[]): string;
};

declare var markdown;
declare var EasyStar;
