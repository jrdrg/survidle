module Entities {
	export class Enemy extends Abstracts.AbstractEntity {

		/**
		 * The type of the entity
		 */
		type = 'enemy';

		constructor(public name: string, public key: string) {
			super(name);

			// Assign random hunger
			this.survival.hunger = chance.floating({min: 0, max: 1});
		}

		/**
		 * Look for the player, then attack him
		 */
		onCycle(game: Services.Game) {
			super.onCycle(game);

			// If the wolf is on a wolf trap, kill him
			var cell = game.world.getCell(this.x, this.y);
			if (this.key === 'wolf' && cell.has('trap')) {
				cell.drop('trap');
				this.survival.life = 0;
			}

			// Look for the player
			if (!this.isOnSameCellThan(game.player)) {
				return this.track(game.player, game);
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
