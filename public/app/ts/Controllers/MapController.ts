module Controllers {
	export class MapController {

		constructor(public $rootScope) {

		}

		/**
		 * Make the player travel to coordinates
		 */
		travel(x: number, y: number) {
			var player = this.$rootScope.player;
			var distance = _.pointsDistance(x, y, player.x, player.y);

			for (var i = 0; i <= distance; i++) {
				player.moveTowards({x: x, y: y});
				this.$rootScope.game.newCycle();
			}
		}

	}
}
