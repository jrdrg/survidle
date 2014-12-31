module Entities {
	export class Player implements HasInventory {

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
