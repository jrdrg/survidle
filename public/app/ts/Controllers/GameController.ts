module Controllers {
	export class GameController {

		/**
		 * The player
		 */
		player: Entities.Player;

		/**
		 * The world
		 */
		world: Entities.World;

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

		/**
		 * @param $scope
		 */
		constructor(
			public $rootScope,
			public $scope,
			public $interval: ng.IIntervalService,
			public $http: ng.IHttpService,
			public items: Services.ItemsFactory
		) {
			$scope.game = this;
			$scope.Math = Math;

			// Load core data
			this.loadDataOnScope('items');
			this.loadDataOnScope('actions');
			this.loadDataOnScope('enemies');
			this.loadDataOnScope('technologies');
			this.loadDataOnScope('events');

			// Restore save
			this.$rootScope.$watch('events', (value) => {
				if (value) {
					this.bootWorld();
					this.restoreSave();
				}
			});
		}

		//////////////////////////////////////////////////////////////////////
		/////////////////////////////// SAVES ////////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Restore the data from localStorage
		 */
		restoreSave() {
			var survidle = JSON.parse(localStorage.getItem('survidle'));
			if (!survidle) {
				return;
			}

			_.each(survidle.player, (value: any, key: string) => {
				if (key == 'inventory') {
					value = this.items.rebuildItems(value);
				}

				this.player[key] = value;
			});

			_.each(survidle.world, (value: any, key: string) => {
				this.world[key] = value;
			});

			this.stages = survidle.game.stages;
			this.createSceneries();
		}

		/**
		 * Save the game
		 */
		save() {
			localStorage.setItem('survidle', JSON.stringify({
				world : {
					cycle: this.world.cycle,
					day  : this.world.day,
				},
				player: {
					inventory        : this.player.inventory,
					skills           : this.player.skills,
					age              : this.player.age,
					survival         : this.player.survival,
					inventoryCapacity: this.player.inventoryCapacity,
				},
				game  : {
					stages: this.stages,
				}
			}));
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
			this.world = new Entities.World();
			this.player = new Entities.Player('Foobar');
			this.encounters = new Services.EncountersManager(this);

			// Bind entities
			this.world.entities.push(this.player);

			// Define sceneries
			this.createSceneries();

			// Define interval
			this.cycle = this.$interval(() => {
				this.newCycle();
				this.save();
			}, this.world.cycleLength * 1000);

			// Bind to scope
			this.$scope.player = this.player;
			this.$scope.world = this.world;
		}

		/**
		 * Check if the game is booted
		 */
		isBooted(): boolean {
			return typeof this.$rootScope.events !== 'undefined';
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

		newCycle() {
			this.world.cycle++;
			this.world.passDays();

			// Trigger encounters
			var encounter;
			if (encounter = this.encounters.triggerEncounters()) {
				this.world.entities.push(encounter);
			}

			// Revenues
			this.computeRevenues();

			this.world.getAliveEntities().forEach((entity: Abstracts.AbstractEntity) => {
				entity.onCycle(this);
			});
		}

		computeRevenues() {
			_.each(this.player.getInventoryContents(), (item: Item) => {
				if (item.revenues) {
					this.player.addMultipleItems(item.revenues, item.quantity);

					if (item.usable) {
						this.player.inventory[item.key].remove();
					}
				}
			});
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// HELPERS ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Load some data from JSON onto the root scope
		 */
		loadDataOnScope(data: string) {
			this.$http.get('public/app/json/' + data + '.json').then((response) => {
				this.$rootScope[data] = response.data;
			});
		}

		/**
		 * Compute the progress of a skill in %
		 */
		skillProgress(level: number): number {
			return Math.round((level - Math.floor(level)) * 100);
		}

	}
}
