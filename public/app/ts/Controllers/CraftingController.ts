module Controllers {
	export class CraftingController {

		constructor(public $scope) {

		}

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

		/**
		 * Check if the player can craft a recipe
		 */
		canCraft(item: Item): boolean {
			var unmet = _.filter(item.ingredients, (required: number, ingredient: string) => {
				return !this.$scope.player.has(ingredient, required);
			});

			return !unmet.length && !this.$scope.player.hasInventoryFull();
		}

		/**
		 * Craft a recipe
		 */
		craft(item: Entities.Item): void {
			if (!this.canCraft(item)) {
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
		recipeCost(item: Item): number {
			return _.sum(item.ingredients);
		}

	}
}
