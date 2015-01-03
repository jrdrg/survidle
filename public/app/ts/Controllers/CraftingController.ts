module Controllers {
	export class CraftingController {

		constructor(public $scope, public logs: Services.LogsHandler) {
			$scope.isUnlocked = this.isUnlocked.bind(this);
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// RECIPES ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Check if an item is unlocked
		 */
		isUnlocked(item: Entities.Item): boolean {
			var required = item.required || 'stage:gatherWood';
			if (!this.$scope.game.isUnlocked(required)) {
				return false;
			}

			return !this.$scope.player.has(item.key) || item.multiple;
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// CRAFTING //////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Check if the player can craft a recipe
		 */
		canCraft(item: Entities.Item): boolean {
			var hasSlot = item.type == 'structure' ? true : !this.$scope.player.hasInventoryFull();
			var unmet = _.filter(item.ingredients, (required: number, ingredient: string) => {
				return !this.$scope.player.has(ingredient, required);
			});

			return !unmet.length && hasSlot;
		}

		/**
		 * Check if we have space to build something on the cell
		 */
		hasSpaceToCraft(item: Entities.Item): boolean {
			return item.type == 'structure' ? !this.$scope.world.getPlayerCell().hasStructure() : true;
		}

		/**
		 * Craft a recipe
		 */
		craft(item: Entities.Item): void {
			if (!this.canCraft(item)) {
				return;
			}

			if (!this.hasSpaceToCraft(item)) {
				this.logs.alert("You can't build two structures on the same cell");
				return;
			}

			// Remove ingredients from inventory
			this.$scope.player.removeMultipleItems(item.ingredients);

			// Add to map
			if (item.type === 'structure') {
				this.$scope.world.getCell(this.$scope.player.x, this.$scope.player.y).add(item);
			} else {
				this.$scope.player.add(item);
			}

			// Mark event
			this.$scope.game.stages['craft' + item.key] = true;
		}

		/**
		 * Get the cost of a recipe
		 */
		recipeCost(item: Entities.Item): number {
			return _.sum(item.ingredients);
		}

	}
}
