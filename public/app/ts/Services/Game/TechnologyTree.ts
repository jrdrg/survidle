module Services {
	export class TechnologyTree {

		/**
		 * The current technology being researched
		 */
		current: Technology;

		/**
		 * The researched technologies
		 */
		researched = {};

		constructor(public $rootScope) {
			$rootScope.$watch('world.cycle', this.progress.bind(this));
		}

		/**
		 * Whether a technology can be researched or not
		 */
		canResearch(technology: Technology): boolean {
			return this.$rootScope.game.isUnlocked(technology.unlock);
		}

		/**
		 * Check if a technology is being researched
		 */
		isResearching(technology: Technology): boolean {
			return this.current && this.current.key == technology.key;
		}

		/**
		 * Check if a technology has been researched
		 */
		hasResearched(technology): boolean {
			var key = technology.key || technology;

			return this.researched[key];
		}

		/**
		 * Progress on the current research
		 */
		progress() {
			if (this.current) {
				this.current.progress += 0.01;
				if (this.current.progress >= 1) {
					this.researched[this.current.key] = this.current;
					this.current = null;
				}
			}
		}

		/**
		 * Research a technology
		 */
		research(technology: Technology) {
			if (!this.canResearch(technology) && !this.hasResearched(technology)) {
				return;
			}

			technology.progress = 0;
			this.current = technology;
		}

	}
}
