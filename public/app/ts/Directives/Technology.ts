module Directives {
	export class Technology {

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
		templateUrl = 'public/app/templates/entities/technology.html';

		link = ($scope, $element, $attrs) => {
			if ($scope.technology.children) {
				this.$compile('<technology ng-repeat="technology in technology.children"></technology>')($scope, function (cloned) {
					$element.find('.media-body').append(cloned);
				});
			}
		};

		constructor(public $compile: ng.ICompileService) {
		}

		/**
		 * @returns {Survidle.Directives.Status}
		 */
		static instance($compile) {
			return new Technology($compile);
		}

	}
}
