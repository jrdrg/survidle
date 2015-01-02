module Entities.Sceneries {
	export class Forest extends Abstracts.AbstractScenery {

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// ACTIONS ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Eat the gathered food
		 */
		eatFood() {
			var player = this.game.player;

			player.inventory['food'].decrement(1);
			player.survival.life = player.survival.life.increment(0.2);
			player.survival.hunger = player.survival.hunger.decrement(0.1);
		}

		/**
		 * Gather some food from the forest
		 */
		gatherFood() {
			this.gather('food');
		}

		/**
		 * Mine some iron
		 */
		gatherIron() {
			this.gather('iron');
		}

		/**
		 * Chop down some woods
		 */
		gatherWood() {
			this.gather('wood');
		}

	}
}
