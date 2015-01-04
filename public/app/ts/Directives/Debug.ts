module Directives {
	export class Debug {

		/**
		 * @type {string}
		 */
		restrict = 'E';

		/**
		 * @type {string}
		 */
		templateUrl = 'public/app/templates/debug.html';

		/**
		 * @type {boolean}
		 */
		transclude = true;

		static instance() {
			return new Debug();
		}

	}
}
