module Controllers {
	export class NavigationController {

		/**
		 * The current tab
		 *
		 * @type {string}
		 */
		current = 'scenery';

		/**
		 * The available panes
		 */
		available = [
			{key: 'scenery', label: 'The Forest'},
			{key: 'encounters', label: 'Encounters'},
			{key: 'technologies', label: 'Technology Tree'},
		];

		/**
		 * Get the current template
		 */
		getTemplate(): string {
			return 'public/app/templates/panes/' + this.current + '.html';
		}

	}
}
