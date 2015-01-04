module Services {
	export class World {

		/**
		 * The size of the world
		 */
		size = 40;

		/**
		 * Generation variables
		 */
		generation = {
			ponds: 3,
		};

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
		cycleLength = 1;

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

		constructor(public game: Services.Game) {
			if (this.game.items.isBooted()) {
				this.passDays();
				this.generateMap();
			}
		}

		//////////////////////////////////////////////////////////////////////
		///////////////////////////// GENERATION /////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Generate the map
		 */
		generateMap() {
			// Generate core cells
			for (var y = 0; y <= this.size; y++) {
				this.map[y] = [];
				for (var x = 0; x <= this.size; x++) {
					this.map[y][x] = this.generateCell(x, y);
				}
			}

			// Generate water
			var numberOfPonds = chance.integer({min: 1, max:(this.size / this.generation.ponds)});
			for (var i = 0; i <= numberOfPonds; i++) {
				this.generatePond();
			}

			// Add some base resources for the player
			var center = this.getCenter();
			this.map[center.y][center.x].type = 'tree';
			this.map[center.y][center.x].addMultipleItems(this.game.items.rebuildByQuantities({wood: 15, food: 15}));
		}

		/**
		 * Generate a cell and its resources
		 */
		generateCell(x: number, y: number) {
			var type = chance.weighted(Entities.Map.Cell.types, Entities.Map.Cell.probabilities);
			var cell = new Entities.Map.Cell(x, y, type);
			cell.inventory = this.game.items.rebuildByQuantities(cell.getResources());

			return cell;
		}

		/**
		 * Generate a pond
		 */
		generatePond() {
			var size = chance.integer({min: 1, max: this.generation.ponds});
			var x = chance.integer({min: 0, max: this.size});
			var y = chance.integer({min: 0, max: this.size});

			// Create base cell
			var center = new Entities.Map.Cell(x, y, 'water');
			this.map[y][x] = center;

			this.map.forEach(function (column) {
				column.forEach(function (cell: Entities.Map.Cell) {
					var distance = cell.distanceWith(center);
					var withingBounds = distance === size ? chance.bool({likelihood: 60}) : true;
					withingBounds = distance > size ? false : withingBounds;

					if (withingBounds) {
						cell.type = 'water';
					}
				});
			});
		}

		/**
		 * Return the cells rebuilt from an object
		 */
		rebuildCells(cells) {
			cells.forEach((column, y) => {
				column.forEach((data, x) => {
					var cell = new Entities.Map.Cell(data.x, data.y, data.type);
					cell.inventory = this.game.items.rebuildItems(data.inventory);

					cells[cell.y][cell.x] = cell;
				});
			});

			return cells;
		}

		//////////////////////////////////////////////////////////////////////
		//////////////////////////////// MAP /////////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Check if an entity is still valid
		 */
		isValidEntity(entity: Abstracts.AbstractEntity): boolean {
			return entity.survival.life > 0 && !this.isOutOfBounds(entity);
		}

		/**
		 * Check if an entity is out of bounds
		 */
		isOutOfBounds(entity: HasCoordinates): boolean {
			return entity.x > this.size || entity.x < 0 || entity.y > this.size || entity.y < 0;
		}

		/**
		 * Loop through all the cells
		 */
		onCells(callback?: Function) {
			this.map.forEach(function (column) {
				column.forEach(function (cell) {
					callback(cell);
				});
			});
		}

		/**
		 * Get a cell by coordinates
		 */
		getCell(x: number, y: number): Entities.Map.Cell {
			return this.map[y][x];
		}

		/**
		 * Get the center coordinates
		 */
		getCenter(): HasCoordinates {
			return {x: this.size / 2, y: this.size / 2};
		}

		/**
		 * Get the cell the player is on
		 */
		getPlayerCell(): Entities.Map.Cell {
			var player = this.getPlayer();

			return this.getCell(player.x, player.y);
		}

		//////////////////////////////////////////////////////////////////////
		///////////////////////////// PATHFINDING ////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Get the walkable matrix from the map
		 */
		getWalkableMatrix() {
			return _.map(this.map, function(row) {
				return _.map(row, function(cell: Entities.Map.Cell) {
					return cell.getWalkableType();
				});
			});
		}

		/**
		 *
		 */
		findPath(entity: Abstracts.AbstractEntity, to: HasCoordinates, callback?: Function) {
			var easyStar = new EasyStar.js();
			easyStar.enableDiagonals();
			easyStar.setGrid(this.getWalkableMatrix());
			easyStar.setAcceptableTiles(['forest', 'tree']);
			easyStar.findPath(entity.x, entity.y, to.x, to.y, function (path) {
				entity.travelStep = 0;
				entity.travels = path;
				if (callback) {
					callback(entity);
				}
			});

			easyStar.calculate();
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// ENTITIES //////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Get the entities at particular coordinates
		 */
		getEntitiesAt(x: number, y: number): Abstracts.AbstractEntity[] {
			return _.filter(this.entities, function (entity: Abstracts.AbstractEntity) {
				if (entity.isDead()) {
					return false;
				}

				return entity.x === x && entity.y === y;
			});
		}

		/**
		 * Get the structures at particular coordinates
		 */
		getStructuresAt(x: number, y: number): Entities.Item[] {
			return this.getCell(x, y).getItemsOfType('structure');
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
			return <Entities.Player> _.find(this.entities, {type: 'player'});
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
			return this.date.hours() > 18 || this.date.hours() < 6;
		}

		/**
		 * Get the current day phase
		 */
		getDayPhase(): string {
			if (this.date.hours() > 0 && this.date.hours() < 6) {
				return 'morning';
			} else if (this.date.hours() > 18 && this.date.hours() < 24) {
				return 'night';
			}
		}

		/**
		 * Get the current time in a human readable format
		 */
		getCurrentTime(): any {
			if (!this.game.player.has('sundial')) {
				return this.getDayNumber();
			}

			if (!this.game.technologyTree.hasResearched('calendar')) {
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
