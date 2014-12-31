module Entities {
	export class Player extends Abstracts.AbstractEntity {

		/**
		 * The age of the player
		 */
		age: number;

		/**
		 * @type {any}
		 */
		inventory = {
			food: 0,
		};

		/**
		 * The player's skills
		 *
		 * @type {any}
		 */
		skills = {
			combat: 1,
			gathering: 1,
			masonry  : 1,
		};

		/**
		 * @param name
		 */
		constructor(public name: string) {
			super(name);

			this.age = Math.floor((Math.random() * 30) + 16);
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// INVENTORY /////////////////////////////
		//////////////////////////////////////////////////////////////////////

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

	}
}
