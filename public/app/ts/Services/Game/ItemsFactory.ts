module Services {
	export class ItemsFactory {

		constructor(public $rootScope) {

		}

		/**
		 * Check if the items factory is booted
		 */
		isBooted() {
			return this.$rootScope.items;
		}

		/**
		 * Rebuild an object of items
		 */
		rebuildItems(items: Inventory): Inventory {
			return _.mapValues(items, function (item) {
				return new Entities.Item(item);
			});
		}

		/**
		 * Rebuild an inventory from an {item: quantity} object
		 */
		rebuildByQuantities(items): Inventory {
			return _.mapValues(items, (quantity: number, type: string) => {
				var item = this.getItemByKey(type);
				item.quantity = quantity;

				return item;
			});
		}

		/**
		 * Get a Item by its key
		 */
		getItemByKey(key: string): Item {
			return <Item> _.find(this.$rootScope.items, {key: key});
		}

	}
}
