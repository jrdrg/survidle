module Entities {
	export class Player extends Abstracts.AbstractEntity {

		/**
		 * The type of the entity
		 */
		type = 'player';

		/**
		 * The subtype
		 */
		key = 'player';

		/**
		 * The age of the player
		 */
		age: number;

		/**
		 * The player's skills
		 *
		 * @type {any}
		 */
		skills = {
			combat   : 1,
			gathering: 1,
			masonry  : 1,
			tracking : 1,
			defense  : 0,
		};

		/**
		 * @param name
		 */
		constructor(public name: string) {
			super(name);

			this.age = Math.floor((Math.random() * 30) + 16);
		}

		/**
		 * Repair an item
		 */
		repair(item: Entities.Item) {
			if (item.quantity >= 1) {
				return;
			}

			// Compute required material
			var repaired = (this.skills.masonry * 2) / 100;
			var required = _.mapValues(item.ingredients, function (quantity: number) {
				return quantity * repaired;
			});

			// Cancel if not enough material
			if (!this.hasMultiple(required)) {
				return;
			}

			item.quantity += repaired;
			this.updateSkillWithExperience('masonry', repaired);
			this.removeMultipleItems(required);
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// INVENTORY /////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Get the inventory capacity
		 */
		getInventoryCapacity() {
			var capacity = this.inventoryCapacity;
			var holders = {basket: 40, cabin: 100};
			_.each(holders, (modifier: number, holder: string) => {
				if (this.has(holder)) {
					capacity += modifier;
				}
			});

			return capacity;
		}

	}
}
