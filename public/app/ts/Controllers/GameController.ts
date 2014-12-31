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

			// Define world and player
			//var name = prompt('What is your name?');
			var name = 'Foobar';
			this.world = new Entities.World();
			this.player = new Entities.Player(name);
			this.encounters = new Services.EncountersManager(this.player);

			// Bind entities
			this.world.entities.push(this.player);

			// Define sceneries
			this.scenery = 'forest';
			this.sceneries = {
				forest: new Entities.Sceneries.Forest(this),
			};

			// Boot game cycle
			$interval(() => {
				this.newCycle();
			}, this.world.cycleLength * 1000);

			// Bind to scope
			$scope.player = this.player;
			$scope.world = this.world;
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
			this.encounters.triggerEncounters();

			this.world.entities.forEach(function (entity: Abstracts.AbstractEntity) {
				entity.onCycle();
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
