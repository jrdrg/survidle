module Abstracts {
	export class AbstractScenery {

		/**
		 * The available actions
		 */
		actions;

		/**
		 * @param game
		 */
		constructor(public game: Controllers.GameController) {
		}

		/**
		 * Get the available actions
		 *
		 * @returns {any}
		 */
		getActions() {
			return this.actions;
		}

		/**
		 * Call an action on the scenery
		 *
		 * @param action
		 * @returns {any}
		 */
		act(action: string) {
			return this[action]();
		}

	}
}
