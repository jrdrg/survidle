module Entities.Sceneries {
	export class Forest extends Abstracts.AbstractScenery {

		actions: Action[] = [
			{method: 'gatherFood', label: 'Gather food', condition: "this.game.stages.lookAround"},
			{method: 'eatFood', label: 'Eat food', condition: "this.game.player.has('food')"},
			{method: 'lookUp', label: 'Look up', once: true},
			{method: 'lookAround', label: 'Look around', once: true},
		];

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
			this.game.stages.gatherFood = true;

			var probability = 0.1;
			var food = 10;

			this.game.player.inventory.food += (food * probability);
		}

		/**
		 * Look up
		 */
		lookUp() {
			this.game.stages.lookUp = true;
		}

	}
}
