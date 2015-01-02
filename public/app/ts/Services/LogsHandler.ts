module Services {
	export class LogsHandler {

		/**
		 * The core events
		 */
		events: Event[] = [];

		/**
		 * The current logs
		 */
		logs: string[] = [
			'You wake up alone in a dark forest, without a shred of memory.'
		];

		constructor(public $rootScope) {
		}

		/**
		 * Trigger an event
		 */
		trigger(when: string) {
			this.events.forEach((event: Event, key: number) => {
				if (event.when === when) {
					this.logs.push(event.contents);
					delete this.events[key];
				}
			});
		}

	}
}
