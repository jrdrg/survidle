module Entities.Sceneries {
	export class Forest extends Abstracts.AbstractScenery {

		actions: Action[] = [
			{method: 'lookAround', label: 'Look around', once: true},
			{method: 'lookUp', label: 'Look up', unlock: "game.stages.lookAround", once: true},
			{method: 'gatherFood', label: 'Gather food', unlock: "game.stages.lookAround", condition: "!player.hasInventoryFull()"},
			{method: 'gatherWood', label: 'Gather wood', unlock: "game.stages.gatherFood", condition: "!player.hasInventoryFull()"},
			{method: 'eatFood', label: 'Eat food', unlock: 'game.stages.gatherFood', condition: "game.player.has('food')"},
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
			this.gatherWithSkill('food', 'gathering');
		}

		gatherWood() {
			this.gatherWithSkill('wood', 'gathering');
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// HELPERS ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		gatherWithSkill(item: string, skill: string) {
			var probability = this.game.player.skills[skill];
			if (!this.game.player.inventory[item]) {
				this.game.player.inventory[item] = 0;
			}

			this.game.player.inventory[item] += Math.round(probability);
		}

	}
}
