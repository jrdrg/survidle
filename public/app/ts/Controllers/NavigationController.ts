module Controllers {
	export class NavigationController {

		/**
		 * The current tab
		 *
		 * @type {string}
		 */
		current = 'scenery';

		/**
		 * Get the current template
		 *
		 * @returns {string}
		 */
		getTemplate() {
			return 'public/app/templates/panes/' +this.current+ '.html';
		}

	}
}
