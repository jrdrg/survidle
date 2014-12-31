module Directives {
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

		link = function($scope) {
			$scope.round = Math.round;
		};

		/**
		 * @returns {Survidle.Directives.Status}
		 */
		static instance() {
			return new Status();
		}

	}
}
