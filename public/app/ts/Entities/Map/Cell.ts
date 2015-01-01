module Entities.Map {
	export class Cell {

		/**
		 * The type of cell
		 */
		type: string;

		constructor(public x: number, public y: number) {
			this.type = _.randomItem(['forest', 'tree']);
		}

	}
}
