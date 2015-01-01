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

_.mixin({
	pointsDistance: function (x1: number, y1: number, x2: number, y2: number): number {
		var distanceA = Math.pow(x1 - x2, 2);
		var distanceB = Math.pow(y1 - y2, 2);

		return Math.sqrt(distanceB + distanceA);
	},
	sum           : function (object): number {
		return _.reduce(object, function (a: number, b: number) {
				return a + b;
			}) || 0;
	},
	randomItem    : function (array) {
		return array[Math.floor(Math.random() * array.length)];
	}
});
