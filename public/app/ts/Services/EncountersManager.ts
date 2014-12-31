module Services {
	export class EncountersManager {

		/**
		 * The current encounter
		 */
		current: Entities.Enemy;

		constructor(public player: Entities.Player, public world: Entities.World) {
		}

		/**
		 * Trigger encounters
		 */
		triggerEncounters() {
			if (this.player.has('house') || !this.player.has('woodenAxe')) {
				return;
			}

			var likelihood = this.world.isNighttime() ? 15 : 5;
			if (chance.bool({likelihood: likelihood})) {
				var enemy = new Entities.Enemy('Direwolf');
				enemy.survival.hunger = chance.floating({min: 0, max: 1});

				return enemy;
			}
		}

	}
}
