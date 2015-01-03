module Directives {
	export class Inventory {

		/**
		 * @type {string}
		 */
		restrict = 'E';

		/**
		 * @type {boolean}
		 */
		replace = true;

		/**
		 * @type {string}
		 */
		templateUrl = 'public/app/templates/sidebar/inventory.html';

		/**
		 * @type {any}
		 */
		scope = {
			entity: '=',
		};

		/**
		 * Whether this is the player's inventory
		 * or something else's
		 */
		isPlayer: boolean;

		constructor(public game: Services.Game, public items: Services.ItemsFactory) {
		}

		/**
		 * When an item is clicked
		 */
		onItem = function (itemKey: string) {
			var item = this.items.getItemByKey(itemKey);

			if (this.isPlayer) {
				this.game.player.drop(item.key);
				this.game.world.getPlayerCell().add(item);
			} else if (this.game.getScenery().canGather(item.key)) {
				this.game.getScenery().gather(item.key);
				this.game.stages['gather' + item.key.title()] = true;
			}
		};

		/**
		 * Bind correct action
		 */
		link = ($scope) => {
			this.isPlayer = $scope.entity.type === 'player';

			$scope.Math = Math;
			$scope.action = this.onItem.bind(this);
			$scope.label = this.isPlayer ? 'Inventory' : 'Zone';
			$scope.tooltip = this.isPlayer ? 'Click to drop' : 'Gather';
			$scope.isPlayer = this.isPlayer;
		};

		static instance(game: Services.Game, items: Services.ItemsFactory) {
			return new Inventory(game, items);
		}

	}
}
