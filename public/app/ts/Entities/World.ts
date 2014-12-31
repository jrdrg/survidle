module Entities {
	export class World {

		/**
		 * The current cycle
		 *
		 * @type {number}
		 */
		cycle = 0;

		/**
		 * The current day number
		 *
		 * @type {number}
		 */
		day = 1;

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
			return this.getCurrentHour() > 18;
		}

		/**
		 * Get the current hour
		 */
		getCurrentHour(): number {
			return this.cycle + 12 - (this.cyclesPerDay * this.day);
		}

		/**
		 * Get the current time in a human readable format
		 */
		getCurrentTime(hasSundial: boolean): any {
			if (!hasSundial) {
				return this.day;
			}

			// Add padding to hour
			var hour = this.getCurrentHour().leftPadding(2);

			return this.day + ', ' + hour + ':00'
		}

		/**
		 * Compute days related variables
		 */
		passDays() {
			this.day = Math.round(this.cycle / this.cyclesPerDay);
		}

	}
}
