module Abstracts {
	export class AbstractEntity implements HasInventory {

		/**
		 * The survival stats
		 */
		survival = {
			life  : 1,
			hunger: 0.5,
		};

		/**
		 * @type {any}
		 */
		inventory = {};

		/**
		 * The available tools
		 */
		tools: Recipe[] = [];

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
		skills = {};

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// SURVIVAL //////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Whether the player is hungry or not
		 *
		 * @returns {boolean}
		 */
		isHungry() {
			return this.survival.hunger > 0.25;
		}

		/**
		 * The inventory capacity
		 */
		getInventoryCapacity() {
			return this.inventoryCapacity;
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// INTERFACE /////////////////////////////
		//////////////////////////////////////////////////////////////////////

		has: (item: string, required?: number) => boolean;
		drop: (item: string) => void;
		getInventorySize: () => number;
		hasEmptyInventory: () => boolean;
		hasInventoryFull: () => boolean;

	}
}

applyMixins(Abstracts.AbstractEntity, [HasInventory], ['getInventoryCapacity']);
