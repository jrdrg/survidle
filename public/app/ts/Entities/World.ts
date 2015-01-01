module Entities {
	export class World {

		/**
		 * The current cycle
		 *
		 * @type {number}
		 */
		cycle = 0;

		date;

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

		constructor() {
			this.passDays();
		}

		/**
		 * Get the absolute day number since the beginning of the game
		 */
		getDayNumber(): number {
			var unix = this.date.unix() - (60 * 60 * 11);

			return Math.round(unix / (60 * 60 * 24));
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// ENTITIES //////////////////////////////
		//////////////////////////////////////////////////////////////////////

		getAliveEntities() {
			return _.filter(this.entities, function (entity: Abstracts.AbstractEntity) {
				return !entity.isDead();
			});
		}

		//////////////////////////////////////////////////////////////////////
		//////////////////////////// DATE AND TIME ///////////////////////////
		//////////////////////////////////////////////////////////////////////

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
