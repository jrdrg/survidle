class HasInventory {

	/**
	 * @type {any}
	 */
	inventory;

	/**
	 * Whether the entity has at least one
	 * of something
	 *
	 * @param item
	 * @returns {boolean}
	 */
	has(item: string) {
		return this.inventory[item] > 0;
	}

	/**
	 * Whether the inventory is empty or not
	 *
	 * @returns {boolean}
	 */
	hasEmptyInventory() {
		return _.reduce(this.inventory, function (a: number, b: number) {
			return a + b;
		}) <= 0;
	}

}
