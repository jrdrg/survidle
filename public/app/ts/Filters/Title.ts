module Filters {
	export class Title {

		/**
		 * ucfirst equivalent
		 *
		 * @returns {function(string): string}
		 */
		constructor() {
			return function (input: string) {
				var words = input.replace(/([A-Z])/g, ' $1').split(' ');
				for (var i = 0; i < words.length; i++) {
					words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
				}

				return words.join(' ');
			};
		}

	}
}
