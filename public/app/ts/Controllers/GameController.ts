module Survidle.Controllers {
	export class GameController {

		player: Survidle.Entities.Player;

		/**
		 * @param $scope
		 */
		constructor($scope) {
			$scope.game = this;

			this.player = new Survidle.Entities.Player();
		}

	}
}
