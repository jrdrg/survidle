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
		stages = {
			lookAround: false,
			lookUp    : false,
			gatherFood: false,
		};

		/**
		 * @param $scope
		 */
		constructor(public $scope, $interval: ng.IIntervalService) {
			$scope.game = this;
			$scope.Math = Math;

			// Restore save
			this.bootWorld();
			this.restoreSave();

			// Boot game cycle
			$interval(() => {
				this.newCycle();
				this.save();
			}, this.world.cycleLength * 1000);

			// Bind to scope
			$scope.player = this.player;
			$scope.world = this.world;
		}

		//////////////////////////////////////////////////////////////////////
		/////////////////////////////// SAVES ////////////////////////////////
		//////////////////////////////////////////////////////////////////////

		restoreSave() {
			var survidle = JSON.parse(localStorage.getItem('survidle'));
			if (!survidle) {
				return;
			}

			_.each(survidle.player, (value: any, key: string) => {
				this.player[key] = value;
			});

			_.each(survidle.world, (key: string, value: any) => {
				this.player[key] = value;
			});

			this.stages = survidle.game.stages;
		}

		/**
		 * Save the game
		 */
		save() {
			localStorage.setItem('survidle', JSON.stringify({
				world : this.world,
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

		bootWorld() {
			// Define world and player
			this.world = new Entities.World();
			this.player = new Entities.Player('Foobar');
			this.encounters = new Services.EncountersManager(this.player, this.world);

			// Bind entities
			this.world.entities.push(this.player);

			// Define sceneries
			this.scenery = 'forest';
			this.sceneries = {
				forest: new Entities.Sceneries.Forest(this),
			};
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// SCENERIES /////////////////////////////
		//////////////////////////////////////////////////////////////////////

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
				this.encounters.current = encounter;
				this.world.entities.push(encounter);
			}

			this.world.getAliveEntities().forEach((entity: Abstracts.AbstractEntity) => {
				entity.onCycle(this);
			});
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// HELPERS ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Get a Recipe by its key
		 */
		getRecipeByKey(key: string): Recipe {
			return <Recipe> _.find(this.$scope.recipes, {key: key});
		}

		/**
		 * Compute the progress of a skill in %
		 */
		skillProgress(level: number): number {
			return Math.round((level - Math.floor(level)) * 100);
		}

	}
}
