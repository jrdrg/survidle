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

		/**
		 * Get the visibility on the map
		 */
		getVisibility(cell: Entities.Map.Cell): number {
			var distance = cell.distanceWith(this.$rootScope.player);
			var visibility = this.$rootScope.world.size - distance;
			if (this.$rootScope.world.isNighttime()) {
				visibility -= 9;
			}

			return Math.max(0, Math.round(visibility));
		}

	}
}
