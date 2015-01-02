module Services {
	export class Game {

		/**
		 * The player
		 */
		player: Entities.Player;

		/**
		 * The service that manages encounters
		 */
		encounters: Services.EncountersManager;

		/**
		 * The current scenery
		 */
		scenery;

		/**
		 * The available sceneries
		 */
		sceneries;

		/**
		 * The stages of the game
		 *
		 * @type {any}
		 */
		stages = {};

		/**
		 * The current cycle
		 */
		cycle;

		constructor(
			public $rootScope,
			public $interval: ng.IIntervalService,
			public items: Services.ItemsFactory,
			public technologyTree: Services.TechnologyTree,
			public logs: Services.LogsHandler,
			public saves: Services.SaveHandler,
			public world: Services.World
		) {

		}

		/**
		 * Check if something is unlocked
		 */
		isUnlocked(required: string): boolean {
			if (typeof required === 'object') {
				return _.filter(required, this.isUnlocked.bind(this)).length === required.length;
			}

			var condition = required.split(':');
			if (condition[0] == 'stage' && !this.stages[condition[1]]) {
				return false;
			} else if (condition[0] == 'technology' && !this.technologyTree.hasResearched(condition[1])) {
				return false;
			}

			return true;
		}

		//////////////////////////////////////////////////////////////////////
		/////////////////////////////// SAVES ////////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Save the current state of the game
		 */
		save() {
			this.saves.save({
				world         : {
					cycle     : this.world.cycle,
					map       : this.world.map,
				},
				player        : {
					x                : this.player.x,
					y                : this.player.y,
					inventory        : this.player.inventory,
					skills           : this.player.skills,
					age              : this.player.age,
					survival         : this.player.survival,
					inventoryCapacity: this.player.inventoryCapacity,
				},
				game          : {
					stages: this.stages,
				},
				logs          : {
					logs  : this.logs.logs,
					events: this.logs.events,
				},
				technologyTree: {
					current   : this.technologyTree.current,
					researched: this.technologyTree.researched,
				}
			});
		}

		/**
		 * Restore the game from a save
		 */
		load() {
			var state = this.saves.load();

			this.saves.restoreProperties(this.logs, state.logs);
			this.saves.restoreProperties(this.technologyTree, state.technologyTree);

			this.saves.restoreProperties(this.player, state.player, {
				inventory: (value) => {
					return this.items.rebuildItems(value)
				}
			});

			this.saves.restoreProperties(this.world, state.world, {
				map: (value) => {
					return this.world.rebuildCells(value);
				},
				structures: (value) => {
					return _.map(value, function (structure: any) {
						return new Entities.Map.Structure(structure.x, structure.y, structure.type);
					});
				}
			});

			this.stages = state.game.stages;
			this.createSceneries();
		}

		/**
		 * Reset the game
		 */
		reset() {
			this.$interval.cancel(this.cycle);

			this.bootWorld();
			this.save();
		}

		/**
		 * Boot the game
		 */
		bootWorld() {
			// Define stages of the game
			this.stages = {
				lookAround: false,
				lookUp    : false,
				gatherFood: false,
			};

			// Define world and player
			this.player = new Entities.Player('Herobrine');
			this.encounters = new Services.EncountersManager(this);
			this.world = new Services.World(this.items);

			// Reset services
			this.logs.events = _.clone(this.$rootScope.events);
			this.logs.logs = this.logs.logs.slice(0, 1);
			this.technologyTree.researched = {};
			this.technologyTree.current = null;

			// Bind entities
			this.world.entities = [this.player];

			// Define scenerieshasi
			this.createSceneries();

			// Define interval
			this.cycle = this.$interval(() => {
				this.newCycle();
				this.save();
			}, this.world.cycleLength * 1000);

			// Bind to scope
			this.$rootScope.player = this.player;
			this.$rootScope.world = this.world;
			this.$rootScope.technologyTree = this.technologyTree;
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// SCENERIES /////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Create the various sceneries
		 */
		createSceneries() {
			this.scenery = 'forest';
			this.sceneries = {
				forest: new Entities.Sceneries.Forest(this, this.$rootScope.actions.forest),
			};
		}

		/**
		 * Get the current scenery
		 */
		getScenery(): Abstracts.AbstractScenery {
			return this.sceneries[this.scenery];
		}

		//////////////////////////////////////////////////////////////////////
		/////////////////////////////// CYCLES ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Start a new cycle
		 */
		newCycle() {
			this.world.cycle++;
			this.world.passDays();

			// Trigger encounters
			var encounter;
			if (encounter = this.encounters.triggerEncounters()) {
				this.world.entities.push(encounter);
			}

			// Revenues
			this.computeRevenues(this.player);

			// Run cells cycles
			this.world.onCells((cell: Entities.Map.Cell) => {
				this.computeRevenues(cell);
			});

			// Run entities cycles
			this.world.getAliveEntities().forEach((entity: Abstracts.AbstractEntity) => {
				if (this.world.isOutOfBounds(entity)) {
					return;
				}

				entity.onCycle(this);
				this.world.getCell(entity.x, entity.y).onCycle(entity);
			});
		}

		/**
		 * Time warp X cycles
		 */
		timeWarp(cycles: number) {
			for (var i = 0; i <= cycles; i++) {
				this.newCycle();
			}
		}

		/**
		 * Compute the revenues of this cycle
		 */
		computeRevenues(entity: Abstracts.HasInventory) {
			_.each(entity.getInventoryContents(), (item: Item) => {
				if (item.revenues) {
					var revenues = this.items.rebuildByQuantities(item.revenues);
					entity.addMultipleItems(revenues, item.quantity);

					if (item.usable) {
						entity.inventory[item.key].remove();
					}
				}
			});
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// HELPERS ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Compute the progress of a skill in %
		 */
		skillProgress(level: number): number {
			return Math.round((level - Math.floor(level)) * 100);
		}

	}
}
