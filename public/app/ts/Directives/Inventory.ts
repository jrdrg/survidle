module Directives {
	export class Inventory {

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
		templateUrl = 'public/app/templates/sidebar/inventory.html';

		scope = {
			entity: '=',
		};

		link = function ($scope) {
			$scope.Math = Math;
		}

		static instance() {
			return new Inventory();
		}

	}
}
