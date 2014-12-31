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
		 * @type {any}
		 */
		scope = {
			name       : '@',
			ingredients: '=',
		};

		/**
		 * @returns {Survidle.Directives.Status}
		 */
		static instance() {
			return new Recipe();
		}

	}
}
