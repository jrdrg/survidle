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

		constructor(public game: Services.Game) {
		}

		/**
		 * When an item is clicked
		 */
		onItem = function (itemKey: string) {
			if (this.isPlayer) {
				this.game.player.drop(itemKey);
			} else if (this.game.getScenery().canGather(itemKey)) {
				this.game.getScenery().gather(itemKey);
				this.game.stages['gather' + itemKey.title()] = true;
			}
		};

		/**
		 * Bind correct action
		 */
		link = ($scope) => {
			this.isPlayer = $scope.entity.type === 'player';

			$scope.Math = Math;
			$scope.action = this.onItem.bind(this);
			$scope.tooltip = this.isPlayer ? 'Click to drop' : 'Gather';
		};

		static instance(game: Services.Game) {
			return new Inventory(game);
		}

	}
}
