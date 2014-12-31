module Controllers {
	export class CraftingController {

		constructor(public $scope) {

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
			this.$scope.player.inventory[recipe.key] = 1;
			this.$scope.player.tools.push(recipe);
		}

	}
}
