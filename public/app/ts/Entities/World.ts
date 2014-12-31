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
		cycleLength = 1;

		/**
		 * Number of cycles in a day
		 *
		 * @type {number}
		 */
		cyclesPerDay = 3;

		/**
		 * Compute days related variables
		 */
		passDays() {
			this.day = Math.round(this.cycle / this.cyclesPerDay);
		}

	}
}
