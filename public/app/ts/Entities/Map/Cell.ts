module Entities.Map {
	export class Cell {

		constructor(public x: number, public y: number, public type: string) {
		}

		/**
		 * Distance with another cell
		 */
		distanceWith(cell: Cell): number {
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
