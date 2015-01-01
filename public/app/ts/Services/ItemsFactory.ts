module Services {
	export class ItemsFactory {

		constructor(public $rootScope) {

		}

		/**
		 * Rebuild an object of items
		 */
		rebuildItems(items: Item[]) {
			return _.mapValues(items, function (item) {
				return new Entities.Item(item);
			});
		}

		/**
		 * Get a Item by its key
		 */
		getItemByKey(key: string): Item {
			return <Item> _.find(this.$rootScope.items, {key: key});
		}

		static instance($rootScope) {
			return new ItemsFactory($rootScope);
		}

	}
}
