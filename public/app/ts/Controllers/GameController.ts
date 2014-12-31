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
		 * The current scenery
		 */
		scenery;

		/**
		 * The available sceneries
		 */
		sceneries;

		/**
		 * @param $scope
		 */
		constructor($scope, $interval: ng.IIntervalService) {
			$scope.game = this;
			$scope.Math = Math;

			// Define world and player
			this.world = new Entities.World();
			this.player = new Entities.Player();

			// Define sceneries
			this.scenery = 'forest';
			this.sceneries = {
				forest: new Entities.Sceneries.Forest(this),
			};

			$interval(() => {
				this.newCycle();
			}, this.world.cycleLength * 1000);
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// SCENERIES /////////////////////////////
		//////////////////////////////////////////////////////////////////////

		getScenery() {
			return this.sceneries[this.scenery];
		}

		//////////////////////////////////////////////////////////////////////
		/////////////////////////////// CYCLES ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		newCycle() {
			this.world.cycle++;
			this.world.passDays();

			// Compute basic needs
			this.player.hunger = this.player.hunger.increment(this.computeNeedGain(30), 1);

			// Compute maluses
			if (this.player.hunger >= 1) {
				this.player.life = this.player.life.decrement(this.computeNeedGain(3));
			}
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// HELPERS ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Compute by how much something gains in a cycle
		 * if it needs to reach 1 in {days} day
		 *
		 * @param days
		 * 1
		 * @returns {number}
		 */
		computeNeedGain(days: number) {
			return 1 / (days * this.world.cyclesPerDay);
		}

	}
}
