module Services {
	export class TechnologyTree {

		/**
		 * The current technology being researched
		 */
		current: Technology;

		constructor(public $rootScope) {
			$rootScope.$watch('world.cycle', this.progress.bind(this));
		}

		/**
		 * Progress on the current research
		 */
		progress() {
			if (this.current) {
				this.current.progress += 0.01;
			}
		}

		/**
		 * Research a technology
		 */
		research(technology: Technology) {
			technology.progress = 0;
			this.current = technology;
		}

	}
}
