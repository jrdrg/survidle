class HasInventory {

	/**
	 * @type {any}
	 */
	inventory;

	inventoryCapacity: number;

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
	 * @returns {number}
	 */
	getInventorySize() {
		return _.reduce(this.inventory, function (a: number, b: number) {
			return a + b;
		})
	}

	/**
	 * Whether the inventory is empty or not
	 *
	 * @returns {boolean}
	 */
	hasEmptyInventory() {
		return this.getInventorySize() <= 0;
	}

	/**
	 * Whether the inventory is full or not
	 *
	 * @returns {boolean}
	 */
	hasInventoryFull() {
		return this.getInventorySize() >= this.inventoryCapacity;
	}

}
