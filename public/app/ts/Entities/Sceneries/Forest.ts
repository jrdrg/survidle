module Entities.Sceneries {
	export class Forest extends Abstracts.AbstractScenery {

		actions: Action[] = [
			{method: 'lookAround', label: 'Look around', once: true},
			{method: 'lookUp', label: 'Look up', unlock: 'game.stages.lookAround', once: true},
			{method: 'gatherFood', label: 'Gather food', unlock: 'game.stages.lookAround', condition: '!player.hasInventoryFull()'},
			{method: 'gatherWood', label: 'Gather wood', unlock: 'game.stages.gatherFood', condition: '!player.hasInventoryFull()'},
			{method: 'eatFood', label: 'Eat food', unlock: 'game.stages.gatherFood', condition: "game.player.has('food')"},
		];

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// ACTIONS ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Eat the gathered food
		 */
		eatFood() {
			var player = this.game.player;

			player.inventory.food = player.inventory.food.decrement(1);
			player.survival.life = player.survival.life.increment(0.2);
			player.survival.hunger = player.survival.hunger.decrement(0.1);
		}

		/**
		 * Gather some food from the forest
		 */
		gatherFood() {
			this.game.player.gatherWithSkill('food', 'gathering');
		}

		/**
		 * Chop down some woods
		 */
		gatherWood() {
			this.game.player.gatherWithSkill('wood', 'masonry');
		}

	}
}
