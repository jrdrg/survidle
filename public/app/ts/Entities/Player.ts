module Entities {
	export class Player implements HasInventory {

		/**
		 * The age of the player
		 */
		age: number;

		/**
		 * @type {number}
		 */
		life = 1;

		/**
		 * @type {number}
		 */
		hunger = 0.5;

		/**
		 * @type {any}
		 */
		inventory = {
			food: 0,
		};

		/**
		 * The base inventory capacity
		 *
		 * @type {number}
		 */
		inventoryCapacity = 25;

		/**
		 * The player's skills
		 *
		 * @type {any}
		 */
		skills = {
			gathering: 1,
		};

		/**
		 * @param name
		 */
		constructor(public name: string) {
			this.age = Math.floor((Math.random() * 30) + 16);
		}

		/**
		 * Whether the player is hungry or not
		 *
		 * @returns {boolean}
		 */
		isHungry() {
			return this.hunger > 0.25;
		}

		/**
		 * Get the inventory capacity
		 */
		getInventoryCapacity() {
			var capacity = this.inventoryCapacity;
			if (this.has('basket')) {
				capacity += 40;
			}

			return capacity;
		}

		// Interface
		//////////////////////////////////////////////////////////////////////

		has: (item: string, required?: number) => boolean;
		drop: (item: string) => void;
		getInventorySize: () => number;
		hasEmptyInventory: () => boolean;
		hasInventoryFull: () => boolean;

	}
}

applyMixins(Entities.Player, [HasInventory], ['getInventoryCapacity']);
