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
			super();

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

		//////////////////////////////////////////////////////////////////////
		/////////////////////////////// SKILLS ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Get the tools affecting a skill
		 */
		getSkillBonuses(skill: string): Recipe[] {
			var bonuses = [];
			if (!this.tools.length) {
				return [];
			}

			_.each(this.tools, (recipe: Recipe) => {
				var bonus = recipe.skills[skill];
				if (typeof bonus !== 'undefined') {
					bonuses.push(recipe);
				}
			});

			return bonuses;
		}

		/**
		 * Get the modifier affecting a skill
		 */
		getSkillModifier(skill: string): number {
			var modifier = 1;
			var bonuses = this.getSkillBonuses(skill);
			_.each(bonuses, function (recipe: Recipe) {
				modifier *= recipe.skills[skill];
			});

			return modifier;
		}

	}
}
