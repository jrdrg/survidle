module Abstracts {
	export class AbstractScenery {

		/**
		 * The available actions
		 */
		actions: Action[];

		/**
		 * @param game
		 */
		constructor(public game: Controllers.GameController) {
		}

		/**
		 * Get the available actions
		 */
		getActions(): Action[] {
			return this.actions;
		}

		/**
		 * Call an action on the scenery
		 *
		 * @param action
		 * @returns {any}
		 */
		act(index: number) {
			var action = this.actions[index];

			// Remove one-time actions after use
			if (action.once) {
				delete this.actions[index];
				this.actions = _.values(this.actions);
			}

			// Execute action
			this.game.stages[action.method] = true;
			if (typeof this[action.method] !== 'undefined') {
				this[action.method]();
			}
		}

	}
}
