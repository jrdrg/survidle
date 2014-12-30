module Survidle.Directives {
	export class Status {

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
		templateUrl = 'public/app/templates/status.html';

		/**
		 * @type {any}
		 */
		scope = {
			label   : '@',
			max: '@',
			value: '=',
		};

		/**
		 * @returns {Survidle.Directives.Status}
		 */
		static instance() {
			return new Status();
		}

	}
}
