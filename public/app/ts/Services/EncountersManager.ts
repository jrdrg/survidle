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

			if (chance.bool({likelihood: 5})) {
				var enemy = new Entities.Enemy('Direwolf');
				enemy.survival.hunger = chance.floating({min: 0, max: 1});
			}
		}

	}
}
