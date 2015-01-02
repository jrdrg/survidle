module Abstracts {
	export class HasInventory {

		/**
		 * @type {any}
		 */
		inventory;

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
		addMultipleItems(items: any, multiplier: number = 1) {
			_.each(items, (quantity: number, item: string) => {
				if (typeof this.inventory[item] === 'undefined') {
					this.inventory[item] = 0;
				}

				if (this.hasInventoryFull()) {
					return;
				}

				this.inventory[item].increment(quantity * multiplier);
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
		 * Drop an item from the inventory
		 */
		drop(item: string) {
			this.inventory[item].decrement();
		}

		/**
		 * Get the raw contents of the inventory
		 */
		getInventoryContents(): Entities.Item[] {
			return _.values(this.inventory);
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
