module Directives {
	export class Recipe {

		/**
		 * @type {string}
		 */
		restrict = 'E';

		/**
		 * @type {boolean}
		 */
		replace = true;

		/**
		 * @type {string}
		 */
		templateUrl = 'public/app/templates/entities/recipe.html';

		/**
		 * @returns {Survidle.Directives.Status}
		 */
		static instance() {
			return new Recipe();
		}

	}
}
