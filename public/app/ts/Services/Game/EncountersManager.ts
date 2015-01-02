module Services {
	export class EncountersManager {

		constructor(public game: Services.Game) {
		}

		/**
		 * Trigger encounters
		 */
		triggerEncounters() {
			if (!this.game.player.has('woodenAxe')) {
				return;
			}

			var modifier = this.game.world.isNighttime ? 2 : 1;
			var enemyType = <Entities.Enemy> _.randomItem(this.game.$rootScope.enemies);
			enemyType = JSON.parse(JSON.stringify(enemyType));

			var likelihood = this.getLikelihood(enemyType) * modifier;
			if (chance.bool({likelihood: likelihood})) {
				var enemy = new Entities.Enemy(enemyType.name, enemyType.type);
				enemy.moveTo(this.getRandomCoordinate(), this.getRandomCoordinate());
				enemy.skills = enemyType.skills;

				return enemy;
			}
		}

		/**
		 * Get a random coordinate within the map
		 */
		getRandomCoordinate() {
			return chance.integer({min: 0, max: this.game.world.size});
		}

		/**
		 * Get the likelihood of an enemy attacking
		 */
		getLikelihood(enemyType: Entities.Enemy): number {
			switch (enemyType.name) {
				case 'Direwolf':
					return this.game.player.has('cabin') ? 1 : 5;
			}
		}

	}
}
