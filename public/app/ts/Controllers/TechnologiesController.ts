module Controllers {
	export class TechnologiesController {

		/**
		 * The technology currently being researched
		 */
		current: Technology;

		constructor(public $scope) {
			$scope.$watch('world.cycle', this.progress.bind(this));
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
