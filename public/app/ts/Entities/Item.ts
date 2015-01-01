module Entities {
	export class Item {

		key: string;
		name: string;
		description: string;

		// Options
		required: string;
		multiple = false;

		// Statistics
		quantity = 0;
		ingredients = {};
		skills = {};
		revenues = {};

		constructor(options: any) {
			this.key = options.key;
			this.name = options.name;
			this.description = options.description;
			this.required = options.required;
			this.multiple = options.multiple;
			this.quantity = options.quantity || 0;
			this.ingredients = options.ingredients;
			this.skills = options.skills;
			this.revenues = options.revenues;
		}

		/**
		 * Increment the quantity
		 */
		increment(by: number = 1) {
			this.quantity += by;
		}

		/**
		 * Decrement the quantity
		 */
		decrement(by: number = 1) {
			this.quantity = this.quantity.decrement(by);
		}

	}
}
