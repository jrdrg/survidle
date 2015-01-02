module Abstracts {
	export class HasInventory {

		/**
		 * The inventory holding items
		 */
		inventory: Inventory = {};

		/**
		 * The base capacity of the inventory
		 */
		inventoryCapacity: number;

		/**
		 * Add an item to the inventory
		 */
		add(item: Entities.Item) {
			if (!this.inventory[item.key]) {
				this.inventory[item.key] = new Entities.Item(_.cloneDeep(item));
			}

			this.inventory[item.key].quantity++;
		}

		/**
		 * Add multiple objects to the inventory
		 */
		addMultipleItems(items: Inventory, multiplier: number = 1) {
			_.each(items, (item: Entities.Item) => {
				if (typeof this.inventory[item.key] === 'undefined') {
					this.inventory[item.key] = item;
				}

				if (this.hasInventoryFull()) {
					return;
				}

				this.inventory[item.key].increment(item.quantity * multiplier);
			});
		}

		/**
		 * Remove multiple objects from the inventory
		 */
		removeMultipleItems(items: InventorySummary) {
			_.each(items, (removed: number, item: string)  => {
				this.inventory[item].decrement(removed);
			});
		}

		/**
		 * Whether the entity has at least X
		 * of something
		 */
		has(item: string, required: number = 1): boolean {
			return this.inventory[item] && this.inventory[item].quantity >= required;
		}

		/**
		 * Check if the entity has multiple items
		 */
		hasMultiple(items: InventorySummary): boolean {
			return _.filter(items, (quantity: number, item: string) => {
				return !this.has(item, quantity);
			}).length === 0;
		}

		/**
		 * Drop an item from the inventory
		 */
		drop(item: string, dropped: number = 1) {
			this.inventory[item].decrement(dropped);
		}

		/**
		 * Get only items of a certain type
		 */
		getItemsOfType(type: string): Entities.Item[] {
			return _.filter(this.getInventoryContents(), {type: type});
		}

		/**
		 * Get the raw contents of the inventory
		 */
		getInventoryContents(): Entities.Item[] {
			return _.filter(this.inventory, 'quantity');
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
			var quantities = _.pluck(this.inventory, 'quantity');

			return _.sum(quantities);
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
}
