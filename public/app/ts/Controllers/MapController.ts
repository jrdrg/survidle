module Controllers {
	export class MapController {

		/**
		 * Whether the player is placing a structure or not
		 */
		placingStructure: Entities.Item;

		/**
		 * The amounts of cells visible
		 */
		visible: number = 20;

		/**
		 * The row to display from
		 */
		fromX: number = 0;

		/**
		 * The column to display from
		 */
		fromY: number = 0;

		constructor(
			public $rootScope,
			public $scope,
			public game: Services.Game,
			public crafting: Services.Crafting,
			public items: Services.ItemsFactory
		) {
			$scope.canCraft = this.crafting.canCraft.bind(this.crafting);
			this.center();
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// BUILDING //////////////////////////////
		//////////////////////////////////////////////////////////////////////

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
		 * Repair an item
		 */
		repair(item: Entities.Item) {
			if (item.quantity >= 1) {
				return;
			}

			// Compute required material
			var repaired = (this.game.player.skills.masonry * 2) / 100;
			var required = _.mapValues(item.ingredients, function (quantity: number) {
				return quantity * repaired;
			});

			// Cancel if not enough material
			if (!this.game.player.hasMultiple(required)) {
				this.game.logs.alert('Not enough resources to repair');
				return;
			}

			item.quantity = Math.max(1, item.quantity + repaired);
			this.game.player.updateSkillWithExperience('masonry', repaired);
			this.game.player.removeMultipleItems(required);

		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// TRAVEL ////////////////////////////////
		//////////////////////////////////////////////////////////////////////

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

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// DISPLAY ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Center the map on the player
		 */
		center() {
			this.fromX = Math.max(0, this.game.player.x - (this.visible / 2));
			this.fromY = Math.max(0, this.game.player.y - (this.visible / 2));
		}

		/**
		 * Offset the visible map in a direction
		 */
		offset(direction: string) {
			var limit = this.game.world.size - this.visible;

			switch (direction) {
				case 'up':
					if (this.fromY > 0) {
						this.fromY--;
					}
					break;

				case 'left':
					if (this.fromX > 0) {
						this.fromX--;
					}
					break;

				case 'right':
					if (this.fromX < limit) {
						this.fromX++;
					}
					break;

				case 'down':
					if (this.fromY < limit) {
						this.fromY++;
					}
					break;
			}
		}

		getCellVariation(cell: Entities.Map.Cell) {
			switch (cell.type) {
				case 'tree':
				case 'rock':
					var hueRotate = 'sepia(' + chance.integer({min: 0, max: 100}) + '%)';

					return {
						backgroundSize  : chance.integer({min: 30, max: 100}) + '%, auto',
						transform       : 'scaleX(' + (chance.bool() ? 1 : -1) + ')',
						'-webkit-filter': hueRotate,
						'-moz-filter'   : hueRotate,
						filter          : hueRotate,
					};

				default:
					return;
			}
		}

		/**
		 * Get the visibility on the map
		 */
		getVisibility(cell: Entities.Map.Cell): number {
			var distance = cell.distanceWith(this.$rootScope.player);
			var visibility = this.visible - distance;
			if (this.$rootScope.world.isNighttime()) {
				visibility -= 9;
			}

			return Math.max(0, Math.round(visibility)) / 10;
		}

	}
}
