module Entities {
	export class Enemy extends Abstracts.AbstractEntity {

		onCycle(game: Controllers.GameController) {
			super.onCycle(game);

			game.player.attack(this);
			this.attack(game.player);
		}

	}
}
