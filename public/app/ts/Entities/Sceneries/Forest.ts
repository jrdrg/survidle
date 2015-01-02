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
			this.game.player.gatherWithSkill(this.game.items.getItemByKey('food'), 'gathering');
		}

		/**
		 * Mine some iron
		 */
		gatherIron() {
			this.game.player.gatherWithSkill(this.game.items.getItemByKey('iron'), 'mining');
		}

		/**
		 * Chop down some woods
		 */
		gatherWood() {
			this.game.player.gatherWithSkill(this.game.items.getItemByKey('wood'), 'masonry');
		}

	}
}
