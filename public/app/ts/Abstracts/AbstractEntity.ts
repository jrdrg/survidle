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
		 * The entity's skills
		 *
		 * @type {any}
		 */
		skills = {
			combat: 1,
		};

		/**
		 * @param name
		 */
		constructor(public name: string) {
		}

		//////////////////////////////////////////////////////////////////////
		/////////////////////////////// SKILLS ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Attach an other entitiy
		 */
		attack(entity: AbstractEntity) {
			var damages = (this.skills.combat * this.getSkillModifier('combat')) / 100;
			this.updateSkillWithExperience('combat', damages);

			entity.survival.life -= damages;
		}

		/**
		 * Gather something, taking into account
		 * skills and tools
		 */
		gatherWithSkill(item: string, skill: string) {
			if (!this.skills[skill]) {
				this.skills[skill] = 1;
			}

			var probability = this.skills[skill] * this.getSkillModifier(skill);
			if (typeof this.inventory[item] == 'undefined') {
				this.inventory[item] = 0;
			}

			// Update skill and inventory
			this.updateSkillWithExperience(skill);
			this.inventory[item] += Math.round(probability);
		}

		/**
		 * Update the experience of a skill
		 */
		updateSkillWithExperience(skill: string, experience = 0.01) {
			this.skills[skill] += experience;
		}

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

		//////////////////////////////////////////////////////////////////////
		/////////////////////////////// CYCLES ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * What happens on every cycle
		 */
		onCycle(game: Controllers.GameController) {
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
		 * Whether the entity is hungry or not
		 *
		 * @returns {boolean}
		 */
		isHungry() {
			return this.survival.hunger > 0.25;
		}

		/**
		 * Whethet the entity is dead
		 */
		isDead(): boolean {
			return this.survival.life <= 0;
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
		addMultipleItems: (items: any, multiplier?: number) => void;

	}
}

applyMixins(Abstracts.AbstractEntity, [HasInventory], ['getInventoryCapacity']);
