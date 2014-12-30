module Survidle.Controllers {
	export class GameController {

		/**
		 * The player
		 */
		player: Survidle.Entities.Player;

		/**
		 * The world
		 */
		world: Survidle.Entities.World;

		/**
		 * @param $scope
		 */
		constructor($scope, $interval: ng.IIntervalService) {
			$scope.game = this;

			this.world = new Survidle.Entities.World();
			this.player = new Survidle.Entities.Player();

			$interval(() => {
				this.newCycle();
			}, this.world.dayLength);
		}

		newCycle() {
			this.world.day++;
		}

	}
}
