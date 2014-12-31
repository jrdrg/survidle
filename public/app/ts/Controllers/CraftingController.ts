module Controllers {
	export class CraftingController {

		constructor(public $scope) {

		}

		isUnlocked(recipe: Recipe) {
			var stage = recipe.required || 'gatherWood';
			if (!this.$scope.game.stages[stage]) {
				return false;
			}

			return !this.$scope.player.has(recipe.key) || recipe.multiple;
		}

		/**
		 * Check if the player can craft a recipe
		 */
		canCraft(recipe: Recipe): boolean {
			var unmet = _.filter(recipe.ingredients, (required: number, ingredient: string) => {
				return !this.$scope.player.has(ingredient, required);
			});

			return !unmet.length && !this.$scope.player.hasInventoryFull();
		}

		/**
		 * Craft a recipe
		 */
		craft(recipe: Recipe): void {
			if (!this.canCraft(recipe)) {
				return;
			}

			// Remove ingredients from inventory
			_.each(recipe.ingredients, (required: number, ingredient: string) => {
				this.$scope.player.inventory[ingredient] -= required;
			});

			// Add item to inventory
			if (!this.$scope.player.inventory[recipe.key]) {
				this.$scope.player.inventory[recipe.key] = 0;
			}

			this.$scope.player.inventory[recipe.key]++;
			this.$scope.player.tools.push(recipe);
		}

		/**
		 * Get the cost of a recipe
		 */
		recipeCost(recipe: Recipe): number {
			return _.sum(recipe.ingredients);
		}

	}
}
