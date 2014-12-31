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
		/////////////////////////////// CYCLES ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * What happens on every cycle
		 */
		onCycle() {
			this.survival.hunger = this.survival.hunger.increment(this.computeNeedGain(30), 1);

			// Compute maluses
			if (this.survival.hunger >= 1) {
				this.survival.life = this.survival.life.decrement(this.computeNeedGain(3));
			}
		}

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

		/**
		 * Compute by how much something gains in a cycle
		 * if it needs to reach 1 in {days} day
		 *
		 * @param days
		 * 1
		 * @returns {number}
		 */
		computeNeedGain(days: number) {
			return 1 / (days * 24);
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
