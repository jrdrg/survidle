module Abstracts {
	export class AbstractEntity implements HasInventory {

		/**
		 * Coordinates
		 */
		x: number = 0;
		y: number = 0;

		/**
		 * The type of the entity
		 */
		key: string;

		/**
		 * What killed the entity
		 */
		killedBy: string = 'hunger';

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
			combat  : 1,
			tracking: 1,
		};

		/**
		 * @param name
		 */
		constructor(public name: string) {
		}

		//////////////////////////////////////////////////////////////////////
		//////////////////////////// POSITIONNING ////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Move to a position on the map
		 */
		moveTo(x: number, y: number) {
			this.x = x;
			this.y = y;
		}

		/**
		 * Move of X offsets
		 */
		move(x: number, y: number) {
			this.x += x;
			this.y += y;
		}

		/**
		 * Move randomly
		 */
		moveRandomly() {
			var bounds = {min: -1, max: 1};
			this.move(chance.integer(bounds), chance.integer(bounds));
		}

		/**
		 * Move towards another entity
		 */
		moveTowards(entity: HasCoordinates) {
			var directionX = entity.x === this.x ? 0 : (entity.x > this.x ? 1 : -1);
			var directionY = entity.y === this.y ? 0 : (entity.y > this.y ? 1 : -1);
			this.move(directionX, directionY);
		}

		/**
		 * Track another entity
		 */
		track(entity: HasCoordinates) {
			var tracking = this.skills.tracking * 10;

			if (this.distanceWith(entity) <= tracking) {
				this.moveTowards(entity);
			} else {
				this.moveRandomly();
			}
		}

		/**
		 * Compute the distance with another entity
		 */
		distanceWith(entity: HasCoordinates): number {
			return _.pointsDistance(this.x, this.y, entity.x, entity.y);
		}

		/**
		 * Check if an entity is on the same cell than
		 * this one
		 */
		isOnSameCellThan(entity: HasCoordinates): boolean {
			return this.x == entity.x && this.y == entity.y;
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
		gatherWithSkill(item: Item, skill: string) {
			if (!this.skills[skill]) {
				this.skills[skill] = 1;
			}

			var probability = this.skills[skill] * this.getSkillModifier(skill);
			if (typeof this.inventory[item.key] == 'undefined') {
				this.inventory[item.key] = new Entities.Item(item);
			}

			// Update skill and inventory
			this.updateSkillWithExperience(skill);
			this.inventory[item.key].increment(Math.round(probability));
		}

		/**
		 * Update the experience of a skill
		 */
		updateSkillWithExperience(skill: string, experience = 0.01) {
			var modifier = Math.max(this.skills[skill], 1);

			this.skills[skill] += experience / Math.floor(modifier);
		}

		/**
		 * Get the tools affecting a skill
		 */
		getSkillBonuses(skill: string): Item[] {
			var bonuses = [];

			_.each(this.getInventoryContents(), (item: Item) => {
				var bonus = item.skills[skill];
				if (typeof bonus !== 'undefined') {
					bonuses.push(item);
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
			_.each(bonuses, function (recipe: Item) {
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
		onCycle(game: Services.Game) {
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

		add: (item: Item) => void;
		has: (item: string, required?: number) => boolean;
		drop: (item: string) => void;
		getInventoryContents: () => Entities.Item[];
		getInventorySize: () => number;
		hasEmptyInventory: () => boolean;
		hasInventoryFull: () => boolean;
		addMultipleItems: (items: any, multiplier?: number) => void;

	}
}

applyMixins(Abstracts.AbstractEntity, [HasInventory], ['getInventoryCapacity']);
