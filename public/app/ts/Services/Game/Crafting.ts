module Services {
	export class Crafting {

		constructor(public game: Services.Game, public logs: Services.LogsHandler) {
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// RECIPES ///////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Check if an item is unlocked
		 */
		isUnlocked(item: Entities.Item): boolean {
			var required = item.required || 'stage:gatherWood';
			if (!this.game.isUnlocked(required)) {
				return false;
			}

			return !this.game.player.has(item.key) || item.multiple;
		}

		//////////////////////////////////////////////////////////////////////
		////////////////////////////// CRAFTING //////////////////////////////
		//////////////////////////////////////////////////////////////////////

		/**
		 * Check if the player can craft a recipe
		 */
		canCraft(item: Entities.Item): boolean {
			if (!this.isUnlocked(item)) {
				return false;
			}

			var hasSlot = item.type === 'structure' ? true : this.hasInventorySpaceToCraft(item);
			var unmet = _.filter(item.ingredients, (required: number, ingredient: string) => {
				return !this.game.player.has(ingredient, required);
			});

			return item.type !== 'resource' && !unmet.length && hasSlot;
		}

		/**
		 * Check if the player has enough space in inventory to craft
		 * the recipe
		 */
		hasInventorySpaceToCraft(item: Entities.Item): boolean {
			var current = this.game.player.getInventorySize();
			var after = current + 1 - this.recipeCost(item);

			return after <= this.game.player.getInventoryCapacity();
		}

		/**
		 * Check if we have space to build something on the cell
		 */
		hasSpaceToCraft(item: Entities.Item, cell?: Entities.Map.Cell): boolean {
			return item.type === 'structure' ? !cell.hasStructure() : true;
		}

		/**
		 * Craft a recipe
		 */
		craft(item: Entities.Item, cell?: Entities.Map.Cell): boolean {
			cell = cell || this.game.world.getPlayerCell();
			if (!this.canCraft(item)) {
				this.logs.alert('Not enough resources');
				return false;
			}

			if (cell && !this.hasSpaceToCraft(item, cell)) {
				this.logs.alert('You can\'t build two structures on the same cell');
				return false;
			}

			// Remove ingredients from inventory
			this.game.player.removeMultipleItems(item.ingredients);

			// Add to map
			if (item.type === 'structure') {
				cell.add(item);
			} else {
				this.game.player.add(item);
			}

			// Mark event
			return this.game.stages['craft' + item.key] = true;
		}

		/**
		 * Get the cost of a recipe
		 */
		recipeCost(item: Entities.Item): number {
			return _.sum(item.ingredients);
		}

	}
}
