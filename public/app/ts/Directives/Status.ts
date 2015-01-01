module Directives {
	export class Status {

		/**
		 * @type {string}
		 */
		restrict = 'E';

		/**
		 * @type {string}
		 */
		templateUrl = 'public/app/templates/status.html';

		/**
		 * @type {any}
		 */
		scope = {
			label: '@',
			max  : '@',
			value: '=',
		};

		/**
		 * Bind Math to the scope
		 */
		link = function ($scope, $element, $attrs) {
			$scope.round = Math.round;
			$scope.rounded = $attrs.rounded ? true : false;
		};

		/**
		 * @returns {Survidle.Directives.Status}
		 */
		static instance() {
			return new Status();
		}

	}
}
