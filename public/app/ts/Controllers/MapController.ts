module Controllers {
	export class MapController {

		/**
		 * Whether the player is placing a structure or not
		 */
		placingStructure: Entities.Item;

		constructor(
			public $rootScope,
			public $scope,
			public game: Services.Game,
			public crafting: Services.Crafting,
			public items: Services.ItemsFactory
		) {
			$scope.canCraft = this.crafting.canCraft.bind(this.crafting);
		}

		/**
		 * Craft an item and place it on the map
		 */
		place(itemKey: string) {
			var item = this.items.getItemByKey(itemKey);

			this.placingStructure = item;
		}

		/**
		 * Build the structure the player
		 * is placing
		 */
		build(cell: Entities.Map.Cell) {
			this.crafting.craft(this.placingStructure, false);
			cell.add(this.placingStructure);
			this.placingStructure = null;
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
