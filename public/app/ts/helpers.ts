function applyMixins(derivedCtor: any, baseCtors: any[]) {
	baseCtors.forEach(baseCtor => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
			derivedCtor.prototype[name] = baseCtor.prototype[name];
		})
	});
}

Number.prototype.decrement = function (by: number, minimum = 0) {
	return Math.max(minimum, this - by);
};

Number.prototype.increment = function (by: number, maximum = 0) {
	return Math.min(maximum, this + by);
};
