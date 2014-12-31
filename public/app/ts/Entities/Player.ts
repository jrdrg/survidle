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
		hunger = 0;

		/**
		 * @type {any}
		 */
		inventory = {
			food: 0,
		};

		/**
		 * @param name
		 */
		constructor(public name: string) {
			this.age = Math.floor((Math.random() * 30) + 16);
		}

		isHungry() {
			return this.hunger > 0.25;
		}

		// Interface
		//////////////////////////////////////////////////////////////////////

		has: (item: string) => boolean;
		hasEmptyInventory: () => boolean;

	}
}

applyMixins(Entities.Player, [HasInventory]);
