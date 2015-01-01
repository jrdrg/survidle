module Controllers {
	export class CraftingController {

		constructor(public $scope) {

		}

		isUnlocked(item: Item) {
			var stage = item.required || 'gatherWood';
			if (!this.$scope.game.stages[stage]) {
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

			this.$scope.player.add(item);
			this.$scope.player.tools.push(item);
		}

		/**
		 * Get the cost of a recipe
		 */
		recipeCost(item: Item): number {
			return _.sum(item.ingredients);
		}

	}
}
