module Entities {
	export class Enemy extends Abstracts.AbstractEntity {

		/**
		 * The type of the entity
		 */
		key = 'enemy';

		constructor(public name: string) {
			super(name);

			// Assign random hunger
			this.survival.hunger = chance.floating({min: 0, max: 1});
		}

		/**
		 * Look for the player, then attack him
		 */
		onCycle(game: Services.Game) {
			super.onCycle(game);

			// Look for the player
			if (!this.isOnSameCellThan(game.player)) {
				return this.track(game.player);
			}

			// Attack the player
			game.player.attack(this);
			this.attack(game.player);
			if (!game.player.isDead()) {
				game.player.killedBy = this.name;
			}
		}

	}
}
