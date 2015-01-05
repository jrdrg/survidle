module Abstracts {
	export class AbstractEntity extends HasInventory {

		/**
		 * Coordinates
		 */
		x: number = 0;
		y: number = 0;

		/**
		 * The travel plan of the entity
		 */
		travels = [];

		/**
		 * The current step in the travel
		 */
		travelStep = 0;

		/**
		 * The type of the entity
		 */
		type: string;

		/**
		 * The subtype
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
			defense : 0.5,
		};

		/**
		 * @param name
		 */
		constructor(public name: string) {
			super();
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// COMBATS ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Attach an other entitiy
		 */
		attack(entity: AbstractEntity) {
			var combatSpeed = 2;
			var damages = this.computeDamages(entity);
			this.updateSkillWithExperience('combat', damages);

			entity.survival.life -= damages * combatSpeed;
		}

		/**
		 * Compute the damages of an attack
		 */
		computeDamages(entity: AbstractEntity): number {
			var damages = this.getSkill('combat') * this.getSkillModifier('combat');
			var defense = entity.getSkill('defense');
			var counter = chance.bool({likelihood: defense})
			if (counter) {
				damages = 0;
			}

			return damages / 100;
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
		 * Continue traveling on a predefined path
		 */
		continuePlannedPath() {
			if (!this.travels.length) {
				return;
			}

			// If we reached destination, stop
			var step = this.travels[this.travelStep];
			if (typeof step === 'undefined') {
				return this.travels = [];
			}

			this.moveTo(step.x, step.y);
			this.travelStep++;
		}

		/**
		 * Track another entity
		 */
		track(entity: HasCoordinates, game?: Services.Game) {
			var tracking = this.skills.tracking * 10;

			if (this.distanceWith(entity) <= tracking) {
				if (!this.travels.length && game) {
					game.world.findPath(this, entity, function(entity) {
						entity.continuePlannedPath();
					});
				} else {
					this.continuePlannedPath();
				}
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
			return this.x === entity.x && this.y === entity.y;
		}

		//////////////////////////////////////////////////////////////////////
		/////////////////////////////// SKILLS ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Get a skill
		 */
		getSkill(skill: string): number {
			if (this.skills[skill] <= 1) {
				return 1;
			}

			return Math.min(10, this.skills[skill]);
		}

		/**
		 * Gather something, taking into account
		 * skills and tools
		 */
		gatherWithSkill(item: Entities.Item, skill: string): number {
			var probability = this.getSkill(skill) * this.getSkillModifier(skill);
			if (typeof this.inventory[item.key] === 'undefined') {
				this.inventory[item.key] = new Entities.Item(item);
			}

			// Update skill and inventory
			var gathered = Math.round(probability);
			this.updateSkillWithExperience(skill);
			this.inventory[item.key].increment(gathered);

			return gathered;
		}

		/**
		 * Update the experience of a skill
		 */
		updateSkillWithExperience(skill: string, experience = 0.01) {
			this.skills[skill] += experience / Math.floor(this.getSkill(skill));
		}

		/**
		 * Get the tools affecting a skill
		 */
		getSkillBonus(skill: string): Entities.Item {
			var bonuses: Entities.Item[] = [];

			_.each(this.getInventoryContents(), (item) => {
				var bonus = item.skills[skill];
				if (typeof bonus !== 'undefined') {
					bonuses.push(item);
				}
			});

			if (!bonuses.length) {
				return null;
			}

			return _.max(bonuses, function (item) {
				return item.skills[skill];
			});
		}

		/**
		 * Get the modifier affecting a skill
		 */
		getSkillModifier(skill: string): number {
			var modifier = 1;
			var bonus = this.getSkillBonus(skill);

			// Apply tool bonus
			if (bonus) {
				modifier *= bonus.skills[skill];
			}

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
			if (game.technologyTree.hasResearched('cooking')) {
				while (this.survival.hunger > 0.15 && this.has('food')) {
					this.eatFood();
				}
			}

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
		 * Eat some food from the inventory
		 */
		eatFood() {
			this.inventory['food'].decrement(1);
			this.survival.life = this.survival.life.increment(0.2);
			this.survival.hunger = this.survival.hunger.decrement(0.1);
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

	}
}
