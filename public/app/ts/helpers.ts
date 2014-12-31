function applyMixins(derivedCtor: any, baseCtors: any[], override: string[]) {
	baseCtors.forEach(baseCtor => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
			if (override.indexOf(name) === -1) {
				derivedCtor.prototype[name] = baseCtor.prototype[name];
			}
		});
	});
}

Number.prototype.decrement = function (by: number = 1, minimum = 0) {
	return Math.max(minimum, this - by);
};

Number.prototype.increment = function (by: number = 1, maximum = 1) {
	return Math.min(maximum, this + by);
};

Number.prototype.leftPadding = function (padding: number): string {
	var number = this + '';

	return number.length > padding ? number : new Array(padding - number.length + 1).join('0') + number;
};

_.mixin({
	sum: function (object): number {
		return _.reduce(object, function (a: number, b: number) {
			return a + b;
		});
	},
	randomItem: function (array) {
		return array[Math.floor(Math.random() * array.length)];
	}
});
