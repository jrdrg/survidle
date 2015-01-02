module Filters {
	export class Title {

		/**
		 * ucfirst equivalent
		 *
		 * @returns {function(string): string}
		 */
		constructor() {
			return function (input: string) {
				return input.title();
			};
		}

	}
}
