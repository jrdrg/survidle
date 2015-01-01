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

		onCycle(game: Controllers.GameController) {
			super.onCycle(game);

			game.player.attack(this);
			this.attack(game.player);
			if (!game.player.isDead()) {
				game.player.killedBy = this.name;
			}
		}

	}
}
