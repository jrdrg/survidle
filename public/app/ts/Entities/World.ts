module Entities {
	export class World {

		/**
		 * The current cycle
		 *
		 * @type {number}
		 */
		cycle = 0;

		/**
		 * The current date object
		 */
		date: Moment;

		/**
		 * The length of a cycle in seconds
		 *
		 * @type {number}
		 */
		cycleLength = 0.5;

		/**
		 * Number of cycles in a day
		 *
		 * @type {number}
		 */
		cyclesPerDay = 24;

		/**
		 * The existing entities in the world
		 */
		entities = [];

		/**
		 * The map
		 */
		map = [];

		constructor(public size: number) {
			this.passDays();

			this.generateMap(size);
		}

		//////////////////////////////////////////////////////////////////////
		//////////////////////////////// MAP /////////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Get a cell by coordinates
		 */
		getCell(x: number, y: number): Entities.Map.Cell {
			return this.map[y][x];
		}

		/**
		 * Generate the map
		 */
		generateMap(size: number) {
			// Generate core cells
			for (var y = 0; y <= size; y++) {
				this.map[y] = [];
				for (var x = 0; x <= size; x++) {
					this.map[y][x] = new Entities.Map.Cell(x, y, _.randomItem(['forest', 'tree']));
				}
			}

			// Generate water
			var numberOfPonds = chance.integer({min: 1, max: 3});
			for (var i = 0; i <= numberOfPonds; i++) {
				this.generatePond();
			}
		}

		generatePond() {
			var size = chance.integer({min: 1, max: 2});
			var x = chance.integer({min: 0, max: this.size});
			var y = chance.integer({min: 0, max: this.size});

			// Create base cell
			var center = new Entities.Map.Cell(x, y, 'water');
			this.map[y][x] = center;

			this.map.forEach(function (column) {
				column.forEach(function (cell: Entities.Map.Cell) {
					var distance = cell.distanceWith(center);
					var withingBounds = distance == size ? chance.bool() : true;
					withingBounds = distance > size ? false : withingBounds;

					if (withingBounds) {
						cell.type = 'water';
					}
				});
			})
		}

		/**
		 * Return the cells rebuilt from an object
		 */
		rebuildCells(cells) {
			cells.forEach(function(column, y) {
				column.forEach(function(cell, x) {
					cells[cell.y][cell.x] = new Entities.Map.Cell(cell.x, cell.y, cell.type);
				});
			});

			return cells;
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// ENTITIES //////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Get the entities at particular coordinates
		 */
		getEntitiesAt(x: number, y: number): Abstracts.AbstractEntity[] {
			return _.filter(this.entities, (entity: Abstracts.AbstractEntity, key: number) => {
				if (entity.isDead()) {
					return false;
				}

				return entity.x == x && entity.y == y;
			});
		}

		/**
		 * Get the entities that are on the same cell
		 * as the player
		 */
		getEntitiesOnPlayer(): Abstracts.AbstractEntity[] {
			var player = this.getPlayer();

			return this.getEntitiesAt(player.x, player.y);
		}

		/**
		 * Get the player's entity
		 */
		getPlayer(): Entities.Player {
			return <Entities.Player> _.find(this.entities, {key: 'player'});
		}

		/**
		 * Get all the entities that are still alive
		 */
		getAliveEntities(): Abstracts.AbstractEntity[] {
			return _.filter(this.entities, function (entity: Abstracts.AbstractEntity) {
				return !entity.isDead();
			});
		}

		//////////////////////////////////////////////////////////////////////
		//////////////////////////// DATE AND TIME ///////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Get the absolute day number since the beginning of the game
		 */
		getDayNumber(): number {
			var unix = this.date.unix() - (60 * 60 * 11);

			return Math.round(unix / (60 * 60 * 24));
		}

		/**
		 * Check if it's night or not
		 */
		isNighttime(): boolean {
			return this.date.hours() > 18;
		}

		/**
		 * Get the current time in a human readable format
		 */
		getCurrentTime(hasSundial: boolean, hasCalendar: boolean): any {
			if (!hasSundial) {
				return this.getDayNumber();
			}

			if (!hasCalendar) {
				return this.getDayNumber() + ', ' + this.date.format('HH:MM');
			}

			return this.date.format('MMM Do, HH:MM');
		}

		/**
		 * Compute days related variables
		 */
		passDays() {
			this.date = moment(0).add(this.cycle, 'hours');
		}

	}
}
