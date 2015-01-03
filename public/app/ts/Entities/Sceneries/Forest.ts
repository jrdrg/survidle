module Entities.Sceneries {
	export class Forest extends Abstracts.AbstractScenery {

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// ACTIONS ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Eat the gathered food
		 */
		eatFood() {
			this.game.player.eatFood();
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
