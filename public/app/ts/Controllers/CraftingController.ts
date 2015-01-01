module Controllers {
	export class CraftingController {

		constructor(public $scope) {

		}

		/**
		 * Check if an item is unlocked
		 */
		isUnlocked(item: Item): boolean {
			var required = item.required || 'stage:gatherWood';
			var condition = required.split(':');
			if (condition[0] == 'stage' && !this.$scope.game.stages[condition[1]]) {
				return false;
			} else if (condition[0] == 'technology' && !this.$scope.technologyTree.hasResearched(condition[1])) {
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
		craft(item: Item): void {
			if (!this.canCraft(item)) {
				return;
			}

			// Remove ingredients from inventory
			_.each(item.ingredients, (required: number, ingredient: string) => {
				this.$scope.player.inventory[ingredient].decrement(required);
			});

			// Add to inventory
			this.$scope.player.add(item);

			// Mark event
			this.$scope.game.stages['craft'+item.key] = true;
		}

		/**
		 * Get the cost of a recipe
		 */
		recipeCost(item: Item): number {
			return _.sum(item.ingredients);
		}

	}
}
