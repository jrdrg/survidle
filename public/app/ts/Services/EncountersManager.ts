module Services {
	export class EncountersManager {

		/**
		 * The current encounter
		 */
		current: Entities.Enemy;

		constructor(public player: Entities.Player) {
		}

		/**
		 * Trigger encounters
		 */
		triggerEncounters() {
			if (this.player.has('house')) {
				return;
			}

			if (chance.bool({likelihood: 30})) {

			}
		}

	}
}
