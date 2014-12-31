module Services {
	export class EncountersManager {

		/**
		 * The current encounter
		 */
		current: Entities.Enemy;

		constructor(public game: Controllers.GameController) {
		}

		/**
		 * Trigger encounters
		 */
		triggerEncounters() {
			if (!this.game.player.has('woodenAxe')) {
				return;
			}

			var modifier = this.game.world.isNighttime ? 2 : 1;
			var enemyType = <Entities.Enemy> _.randomItem(this.game.$scope.enemies);

			var likelihood = 5 * modifier;
			if (chance.bool({likelihood: likelihood})) {
				var enemy = new Entities.Enemy(enemyType.name);
				enemy.skills = enemyType.skills;

				return enemy;
			}
		}

	}
}
