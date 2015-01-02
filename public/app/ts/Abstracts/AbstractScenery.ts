module Abstracts {
	export class AbstractScenery {

		/**
		 * @param game
		 */
		constructor(public game: Services.Game, public actions: Action[]) {
			this.actions = _.filter(actions, function (action: Action) {
				return !action.once || action.once && !game.stages[action.method];
			});
		}

		/**
		 * Get the available actions
		 */
		getActions(): Action[] {
			return this.actions;
		}

		/**
		 * Check if the player can gather an item
		 */
		canGather(item: string) {
			return this.game.world.getPlayerCell().has(item) && !this.game.player.hasInventoryFull();
		}

		/**
		 * Gather an item from the current cell
		 */
		gather(item: string, skill: string) {
			var gathered = this.game.player.gatherWithSkill(this.game.items.getItemByKey(item), skill);

			this.game.world.getPlayerCell().drop(item, gathered);
		}

		/**
		 * Call an action on the scenery
		 */
		act(index: number, condition = 'true'): void {
			if (!this.game.$rootScope.$eval(condition)) {
				return;
			}

			// Remove one-time actions after use
			var action = this.actions[index];
			if (action.once) {
				delete this.actions[index];
				this.actions = _.values(this.actions);
			}

			// Execute action
			this.game.stages[action.method] = true;
			this.game.logs.trigger(action.method);
			if (typeof this[action.method] !== 'undefined') {
				this[action.method]();
			}
		}

	}
}
