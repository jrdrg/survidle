module Directives {
	export class Recipe {

		/**
		 * @type {string}
		 */
		restrict = 'E';

		/**
		 * @type {boolean}
		 */
		transclude = true;

		/**
		 * @type {string}
		 */
		templateUrl = 'public/app/templates/recipe.html';

		/**
		 * @returns {Survidle.Directives.Status}
		 */
		static instance() {
			return new Recipe();
		}

	}
}
