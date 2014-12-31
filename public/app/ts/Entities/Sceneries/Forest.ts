module Entities.Sceneries {
	export class Forest extends Abstracts.AbstractScenery {

		actions = {
			gatherFood: 'Gather food',
			eatFood   : 'Eat food',
		};

		constructor(game) {
			super(game);
		}

		getActions() {
			var actions = _.clone(this.actions);
			if (!this.game.player.has('food')) {
				delete actions.eatFood;
			}

			return actions;
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// ACTIONS ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Eat the gathered food
		 */
		eatFood() {
			this.game.player.inventory.food = this.game.player.inventory.food.decrement(1);
			this.game.player.hunger = this.game.player.hunger.decrement(0.1);
		}

		/**
		 * Gather some food from the forest
		 */
		gatherFood() {
			var probability = 0.1;
			var food = 10;

			this.game.player.inventory.food += (food * probability);
		}

	}
}
