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

		/**
		 * The alerts
		 */
		alerts: {message: string; type: string; close: boolean}[] = [];

		constructor(public $rootScope) {
		}

		/**
		 * Alert of something
		 */
		alert(message: string, type: string = 'danger') {
			this.alerts.push({
				message: message,
				type   : type,
				close  : true,
			});
		}

		/**
		 * Close an alert
		 */
		close(index: number) {
			this.alerts.splice(index, 1);
		}

		/**
		 * Trigger an event
		 */
		trigger(when: string) {
			this.events.forEach((event: Event, key: number) => {
				if (event.when === when) {
					this.logs.push(event.contents);
					this.events = _.without(this.events, event);
				}
			});
		}

	}
}
