class HasInventory {

	/**
	 * @type {any}
	 */
	inventory;

	/**
	 * The base capacity of the inventory
	 */
	inventoryCapacity: number;

	/**
	 * Whether the entity has at least X
	 * of something
	 */
	has(item: string, required: number = 1): boolean {
		return this.inventory[item] >= required;
	}

	/**
	 * Drop an item from the inventory
	 */
	drop(item: string) {
		this.inventory[item] = this.inventory[item].decrement();
	}

	/**
	 * Get the capacity of the inventory
	 */
	getInventoryCapacity(): number {
		return this.inventoryCapacity;
	}

	/**
	 * Get the current inventory size
	 */
	getInventorySize(): number {
		return _.reduce(this.inventory, function (a: number, b: number) {
			return a + b;
		});
	}

	/**
	 * Whether the inventory is empty or not
	 */
	hasEmptyInventory(): boolean {
		return this.getInventorySize() <= 0;
	}

	/**
	 * Whether the inventory is full or not
	 */
	hasInventoryFull(): boolean {
		return this.getInventorySize() >= this.getInventoryCapacity();
	}

}
