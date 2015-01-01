module Entities {
	export class World {

		/**
		 * The current cycle
		 *
		 * @type {number}
		 */
		cycle = 0;

		/**
		 * The current date object
		 */
		date: Moment;

		/**
		 * The length of a cycle in seconds
		 *
		 * @type {number}
		 */
		cycleLength = 0.5;

		/**
		 * Number of cycles in a day
		 *
		 * @type {number}
		 */
		cyclesPerDay = 24;

		/**
		 * The existing entities in the world
		 */
		entities = [];

		/**
		 * The map
		 */
		map = [];

		constructor(public size: number) {
			this.passDays();

			this.generateMap(size);
		}

		//////////////////////////////////////////////////////////////////////
		//////////////////////////////// MAP /////////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Generate the map
		 */
		generateMap(size: number) {
			for (var y = 0; y <= size; y++) {
				this.map[y] = [];

				for (var x = 0; x <= size; x++) {
					this.map[y][x] = new Entities.Map.Cell(x, y);
				}
			}
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// ENTITIES //////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Get the entities at particular coordinates
		 */
		getEntitiesAt(x: number, y: number): Abstracts.AbstractEntity[] {
			return _.filter(this.entities, function (entity: Abstracts.AbstractEntity) {
				return entity.x == x && entity.y == y;
			});
		}

		/**
		 * Get the entities that are on the same cell
		 * as the player
		 */
		getEntitiesOnPlayer(): Abstracts.AbstractEntity[] {
			var player = this.getPlayer();

			return this.getEntitiesAt(player.x, player.y);
		}

		/**
		 * Get the player's entity
		 */
		getPlayer(): Entities.Player {
			return <Entities.Player> _.find(this.entities, {key: 'player'});
		}

		/**
		 * Get all the entities that are still alive
		 */
		getAliveEntities(): Abstracts.AbstractEntity[] {
			return _.filter(this.entities, function (entity: Abstracts.AbstractEntity) {
				return !entity.isDead();
			});
		}

		//////////////////////////////////////////////////////////////////////
		//////////////////////////// DATE AND TIME ///////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Get the absolute day number since the beginning of the game
		 */
		getDayNumber(): number {
			var unix = this.date.unix() - (60 * 60 * 11);

			return Math.round(unix / (60 * 60 * 24));
		}

		/**
		 * Check if it's night or not
		 */
		isNighttime(): boolean {
			return this.date.hours() > 18;
		}

		/**
		 * Get the current time in a human readable format
		 */
		getCurrentTime(hasSundial: boolean, hasCalendar: boolean): any {
			if (!hasSundial) {
				return this.getDayNumber();
			}

			if (!hasCalendar) {
				return this.getDayNumber() + ', ' + this.date.format('HH:MM');
			}

			return this.date.format('MMM Do, HH:MM');
		}

		/**
		 * Compute days related variables
		 */
		passDays() {
			this.date = moment(0).add(this.cycle, 'hours');
		}

	}
}
