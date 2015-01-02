module Entities.Map {
	export class Cell extends Abstracts.HasInventory {

		constructor(public x: number, public y: number, public type: string) {
			super();
		}

		/**
		 * Create the available resources on the cell
		 */
		getResources(): any {
			switch (this.type) {
				case 'forest':
					return {
						food: chance.integer({min: 10, max: 30}),
					};

				case 'tree': {
					return {
						wood: chance.integer({min: 10, max: 20}),
					};
				}
			}
		}

		/**
		 * Distance with another cell
		 */
		distanceWith(cell: HasCoordinates): number {
			return _.pointsDistance(this.x, this.y, cell.x, cell.y);
		}

		/**
		 * On every cycle, on the entities that are on the cell
		 */
		onCycle(entity: Abstracts.AbstractEntity) {
			switch (this.type) {
				case 'water':
					entity.survival.life -= 0.1;
					if (entity.isDead()) {
						entity.killedBy = 'drowning';
					}
			}
		}
	}
}
